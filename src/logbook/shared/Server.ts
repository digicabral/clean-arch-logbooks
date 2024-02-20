import express from "express";
import { CreateLogBookController } from "../features/create-logbook/CreateLogbookController";
import { GetLogbookController } from "../features/get-logbook/GetLogbookController";

export class Server {
  public static async run(
    port: number,
    controller: CreateLogBookController,
    getController: GetLogbookController
  ): Promise<void> {
    const app = express();

    app.use(express.json());

    app.post("/logbooks", (req, res) => controller.handle(req, res));
    app.get("/logbooks", (req, res) => getController.handle(req, res));

    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  }
}
