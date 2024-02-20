import { PrismaClient } from "@prisma/client";
import { CreateLogBookController } from "./logbook/features/create-logbook/CreateLogbookController";
import { CreateLogBookUseCase } from "./logbook/features/create-logbook/CreateLogbookUseCase";
import { GetLogbookController } from "./logbook/features/get-logbook/GetLogbookController";
import { GetLogbookUseCase } from "./logbook/features/get-logbook/GetLogbookUseCase";
import { InMemoryLogbookRepository } from "./logbook/shared/InMemoryLogbookRepository";
import { PrismaLogbookRepository } from "./logbook/shared/PrismaLogbookRepository";
import { Server } from "./logbook/shared/Server";

export async function main(): Promise<void> {
  const client = new PrismaClient();
  const prismaRepository = new PrismaLogbookRepository(client);
  const inMemoryRepo = new InMemoryLogbookRepository();
  const useCase = new CreateLogBookUseCase(prismaRepository);
  const controller = new CreateLogBookController(useCase);
  const getUseCase = new GetLogbookUseCase(prismaRepository);
  const getController = new GetLogbookController(getUseCase);
  await Server.run(3000, controller, getController);
}

main();
