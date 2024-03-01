import express from "express";
import { CreateLogBookController } from "../features/create-logbook/CreateLogbookController";
import { GetLogbookController } from "../features/get-logbook/GetLogbookController";

type HttpHandler = (req: any, res: any) => void;

interface HttpServer {
  listen(port: number): void;
  route({
    method: string,
    path: string,
    handler: HttpHandler,
  }): void
}

class ExpressAdapter implements HttpServer {
  private server: ExpressServer;

  constructor() {
    this.server = express();
    this.server.use(express.json());
  }

  listen(port: number): void {
    this.server.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  }

  route({ method: string, path: string, handler: HttpHandler }: { method: any; path: any; handler: any; }): void {
    const cb = this.server.route[method]((expressReq, expressRes) => {
      const customReq = {
        query: expressReq.query,
        body: { name: 'express' },
      }

      const customRes = {
        //        
      }

      handler(customReq, customRes);
    });
  }
}

class FastifyAdapter implements HttpServer {
  private server: ExpressServer;

  constructor() {
    this.server = fastify();
  }

  listen(port: number): void {
    this.server.listen({ port }, () => {
      console.log("Server is running on port: " + port);
    });
  }

  route({ method: string, path: string, handler: HttpHandler, }: { method: any; path: any; handler: any; }): void {

  }
}

export class Server {
  private server: HttpServer;

  constructor(server: HttpServer) {
    this.server = server;
  }

  public static async run(
    port: number,
    controller: CreateLogBookController,
    getController: GetLogbookController
  ): Promise<void> {
    this.server.route({
      method: 'post',
      path: '/logbooks',
      handler: (req: HttpHandler['req'], res: HttpHandler['res']) => {
        const { status, data } = controller.handle(req.body.name);
        res.status(status).send(data);
      }
    });

    this.server.route({
      method: 'post',
      path: '/logbooks',
      handler: (req, res) => {
        // const { status, data } = controller.handle(req.body.name);
        // res.status(status).send(data);
      }
    });

    this.server.listen(port);
  }
}

