import { Logbook } from "../domain/Logbook";

export interface ILogbookRepository {
  save(logbook: Logbook): Promise<boolean>;
}
