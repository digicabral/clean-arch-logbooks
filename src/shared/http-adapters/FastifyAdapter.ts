import fastify, { FastifyInstance, HTTPMethods, RouteOptions } from 'fastify';
import { IHttpServer } from './IHttpServer';

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
        handler: (request: any, reply: any) => any;
    }): void {
        const options: RouteOptions = {
            method,
            url: path,
            handler: async (request, response) => {
                response.header('Http-Client', 'fastify');
                const fastifyReply = await handler(request, response);
                return fastifyReply;
            },
        };

        this.server.route(options);
    }
}
export default FastifyAdapter;
