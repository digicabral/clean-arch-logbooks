import { ILogbookRepository } from "../application/ILogbookRepository";
import { Logbook } from "../domain/Logbook";

export class InMemoryLogbookRepository implements ILogbookRepository {
  private readonly _logbooks: Logbook[] = [];

  public async find(id: string): Promise<Logbook | null> {
    return this._logbooks.find((item) => item.id === id) ?? null;
  }

  public async save(logbook: Logbook): Promise<boolean> {
    this._logbooks.push(logbook);
    return true;
  }
}
