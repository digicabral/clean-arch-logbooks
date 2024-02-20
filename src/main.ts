import { CreateLogBookUseCase } from "./application/CreateLogbookUseCase";
import { InMemoryLogbookRepository } from "./infrastructure/inMemoryLogbookRepository";
import { CreateLogBookController } from "./presentation/CreateLogbookController";
import { Server } from "./presentation/Server";

export async function main(): Promise<void> {
  const inMemoryRepo = new InMemoryLogbookRepository();
  const useCase = new CreateLogBookUseCase(inMemoryRepo);
  const controller = new CreateLogBookController(useCase);
  await Server.run(3000, controller);
}

main();
