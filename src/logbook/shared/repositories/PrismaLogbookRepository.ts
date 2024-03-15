import { PrismaClient } from '@prisma/client';
import { Logbook } from '../../domain/Logbook';
import { ILogbookRepository } from './ILogbookRepository';

export class PrismaLogbookRepository implements ILogbookRepository {
    public constructor(private readonly _client: PrismaClient) {}

    public async find(id: string): Promise<Logbook | null> {
        const result = await this._client.logbook.findUnique({ where: { id: id } });
        if (!result) return result;

        return new Logbook(result.name, result.userId, result.id);
    }

    public async save(logbook: Logbook): Promise<boolean> {
        await this._client.logbook.create({
            data: logbook,
        });

        return true;
    }
}
