import { CreateLogBookController } from "../features/create-logbook/CreateLogbookController";
import { GetLogbookController } from "../features/get-logbook/GetLogbookController";
import { IHttpServer } from "./http-adapters/IHttpServer";

export class Server {
  private server: IHttpServer;

  constructor(server: IHttpServer) {
    this.server = server;
  }

  public async run(
    port: number,
    controller: CreateLogBookController,
    getController: GetLogbookController
  ): Promise<void> {
    this.server.route({
      method: "post",
      path: "/logbooks",
      handler: async (req: any, res: any) => {
        const { status, data } = await controller.handle(req.body.name);
        res.status(status).send(data);
      },
    });
    this.server.listen(port);
  }
}
