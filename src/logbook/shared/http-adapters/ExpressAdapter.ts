import express, { IRoute } from "express";
import { IHttpServer } from "./IHttpServer";

class ExpressAdapter implements IHttpServer {
  private server: express.Application;

  constructor() {
    this.server = express();
    this.server.use(express.json());
  }

  listen(port: number): void {
    this.server.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  }

  route({
    method,
    path,
    handler,
  }: {
    method: keyof IRoute;
    path: string;
    handler: any;
  }): void {
    const cb = this.server
      .route(path)
      [method]((req: express.Request, res: express.Response) => {
        const customReq = {
          query: req.query,
          body: req.body,
          params: req.params,
        };

        const customRes = {};

        handler(customReq, customRes);
      });
  }
}

export default ExpressAdapter;
