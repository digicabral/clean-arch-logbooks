import { PrismaClient } from "@prisma/client";
import { CreateLogBookController } from "./logbook/features/create-logbook/CreateLogbookController";
import { CreateLogBookUseCase } from "./logbook/features/create-logbook/CreateLogbookUseCase";
import { GetLogbookController } from "./logbook/features/get-logbook/GetLogbookController";
import { GetLogbookUseCase } from "./logbook/features/get-logbook/GetLogbookUseCase";
import { Server } from "./logbook/shared/Server";
import ExpressAdapter from "./logbook/shared/http-adapters/ExpressAdapter";
import { InMemoryLogbookRepository } from "./logbook/shared/repositories/InMemoryLogbookRepository";
import { PrismaLogbookRepository } from "./logbook/shared/repositories/PrismaLogbookRepository";

export async function main(): Promise<void> {
  const client = new PrismaClient();
  const prismaRepository = new PrismaLogbookRepository(client);
  const inMemoryRepo = new InMemoryLogbookRepository();
  const useCase = new CreateLogBookUseCase(prismaRepository);
  const controller = new CreateLogBookController(useCase);
  const getUseCase = new GetLogbookUseCase(prismaRepository);
  const getController = new GetLogbookController(getUseCase);

  const expressHttpServer = new ExpressAdapter();

  const server = new Server(expressHttpServer);
  server.run(3000, controller, getController);
}

main();
