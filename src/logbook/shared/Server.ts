import { IHttpServer } from '../../shared/http-adapters/IHttpServer';
import { CreateLogBookController } from '../features/create-logbook/CreateLogbookController';
import { GetLogbookController } from '../features/get-logbook/GetLogbookController';

export class Server {
    private server: IHttpServer;

    constructor(server: IHttpServer) {
        this.server = server;
    }

    public async run(
        port: number,
        createController: CreateLogBookController,
        getController: GetLogbookController
    ): Promise<void> {
        this.server.route({
            method: 'post',
            path: '/logbooks',
            handler: async (ctx) => {
                const { status, data } = await createController.handle(ctx.body.name);

                return {
                    status,
                    body: data,
                };
            },
        });

        this.server.route({
            method: 'get',
            path: '/logbooks/:id',
            handler: async (ctx) => {
                const { status, data } = await getController.handle(ctx?.params.id);

                return { status, body: data };
            },
        });

        this.server.listen(port);
    }
}
