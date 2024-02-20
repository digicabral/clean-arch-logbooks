import { PrismaClient } from "@prisma/client";
import { CreateLogBookUseCase } from "./application/CreateLogbookUseCase";
import { InMemoryLogbookRepository } from "./infrastructure/InMemoryLogbookRepository";
import { PrismaLogbookRepository } from "./infrastructure/PrismaLogbookRepository";
import { CreateLogBookController } from "./presentation/CreateLogbookController";
import { Server } from "./presentation/Server";

export async function main(): Promise<void> {
  const client = new PrismaClient();
  const prismaRepository = new PrismaLogbookRepository(client);
  const inMemoryRepo = new InMemoryLogbookRepository();
  const useCase = new CreateLogBookUseCase(prismaRepository);
  const controller = new CreateLogBookController(useCase);
  await Server.run(3000, controller);
}

main();
