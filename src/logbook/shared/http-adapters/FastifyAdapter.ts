import fastify, { FastifyInstance } from "fastify";
import { Server as FastifyServer, IncomingMessage, ServerResponse } from "http";
import { IHttpServer } from "./IHttpServer";

class FastifyAdapter implements IHttpServer {
  private server: FastifyInstance<
    FastifyServer,
    IncomingMessage,
    ServerResponse
  >;

  constructor() {
    this.server = fastify();
  }

  listen(port: number): void {
    this.server.listen({ port }, () => {
      console.log("Server is running on port: " + port);
    });
  }

  route({
    method,
    path,
    handler,
  }: {
    method: any;
    path: any;
    handler: any;
  }): void {
    const options = { method, url: path, handler };
    this.server.route(options);
  }
}
export default FastifyAdapter;
