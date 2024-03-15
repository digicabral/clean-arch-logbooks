import { PrismaClient } from '@prisma/client';
import { CreateLogBookController } from './logbook/features/create-logbook/CreateLogbookController';
import { CreateLogBookUseCase } from './logbook/features/create-logbook/CreateLogbookUseCase';
import { GetLogbookController } from './logbook/features/get-logbook/GetLogbookController';
import { GetLogbookUseCase } from './logbook/features/get-logbook/GetLogbookUseCase';
import { Server } from './logbook/shared/Server';
import { PrismaLogbookRepository } from './logbook/shared/repositories/PrismaLogbookRepository';
import ExpressAdapter from './shared/http-adapters/ExpressAdapter';
import FastifyAdapter from './shared/http-adapters/FastifyAdapter';

export async function main(): Promise<void> {
    const client = new PrismaClient();
    const prismaRepository = new PrismaLogbookRepository(client);
    //const inMemoryRepo = new InMemoryLogbookRepository();
    const useCase = new CreateLogBookUseCase(prismaRepository);
    const createController = new CreateLogBookController(useCase);
    const getUseCase = new GetLogbookUseCase(prismaRepository);
    const getController = new GetLogbookController(getUseCase);

    const HTTP_FRAMEWORK = process.env.HTTP_FRAMEWORK;
    let httpServer: ExpressAdapter | FastifyAdapter;

    if (HTTP_FRAMEWORK === 'express') httpServer = new ExpressAdapter();
    else httpServer = new FastifyAdapter();

    const server = new Server(httpServer);
    server.run(3000, createController, getController);
}

main();
