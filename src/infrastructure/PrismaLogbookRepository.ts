import { Logbook, PrismaClient } from "@prisma/client";
import { ILogbookRepository } from "../application/ILogbookRepository";

export class PrismaLogbookRepository implements ILogbookRepository {
  public constructor(private readonly _client: PrismaClient) {}
  public async save(logbook: Logbook): Promise<boolean> {
    await this._client.logbook.create({
      data: logbook,
    });

    return true;
  }
}
