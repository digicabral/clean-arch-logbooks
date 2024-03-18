import fastify, { FastifyInstance, HTTPMethods, RouteOptions } from 'fastify';
import { Context, HttpHandler, IHttpServer } from './IHttpServer';

class FastifyAdapter implements IHttpServer {
    private server: FastifyInstance;

    constructor() {
        this.server = fastify({ logger: true });
    }

    listen(port: number): void {
        this.server.listen({ port }, () => {
            console.log('Server is running on port: ' + port);
        });
    }

    route({
        method,
        path,
        handler,
    }: {
        method: HTTPMethods;
        path: string;
        handler: HttpHandler;
    }): void {
        const options: RouteOptions = {
            method,
            url: path,
            handler: async (request, reply) => {
                const ctx: Context = {
                    body: request.body as Record<string, string>,
                    headers: request.headers as Record<string, string>,
                    params: request.params as Record<string, string>,
                };

                reply.header('Http-Client', 'fastify');

                const handlerResponse = await handler(ctx);

                reply.status(handlerResponse.status).send(handlerResponse.body);
            },
        };

        this.server.route(options);
    }
}
export default FastifyAdapter;
