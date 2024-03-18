import express, {
    Application,
    Request as ExpressRequest,
    Response as ExpressResponse,
    IRoute,
} from 'express';
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
        this.server.route(path)[method](async (req: ExpressRequest, res: ExpressResponse) => {
            const ctx = {
                query: req.query,
                body: req.body,
                params: req.params,
            };

            res.setHeader('Http-client', 'express');
            res.removeHeader('x-powered-by');

            const newRes = await handler(ctx);

            res.status(newRes.status).send(newRes.body);
        });
    }
}

export default ExpressAdapter;
