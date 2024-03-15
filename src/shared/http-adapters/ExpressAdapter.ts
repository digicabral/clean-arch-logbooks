import express, { Application, IRoute, Request, Response } from 'express';
import { IHttpServer } from './IHttpServer';

class ExpressAdapter implements IHttpServer {
    private server: Application;

    constructor() {
        this.server = express();
        this.server.use(express.json());
    }

    public listen(port: number): void {
        this.server.listen(port, () => {
            console.log('Server is running on port: ' + port);
        });
    }

    public route({
        method,
        path,
        handler,
    }: {
        method: keyof IRoute;
        path: string;
        handler: any;
    }): void {
        this.server.route(path)[method]((req: Request, res: Response) => {
            const customReq = {
                query: req.query,
                body: req.body,
                params: req.params,
            };

            res.setHeader('Http-client', 'express');
            res.removeHeader('x-powered-by');
            const customRes = {
                status: res.status,
                send: res.send.bind(res),
            };

            handler(customReq, customRes);
        });
    }
}

export default ExpressAdapter;
