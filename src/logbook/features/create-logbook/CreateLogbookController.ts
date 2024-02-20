import { Request, Response } from "express";
import {
  CreateLogBookUseCase,
  ICreateLogbookResult,
} from "./CreateLogbookUseCase";

export class CreatedLogbookDto implements ICreateLogbookResult {
  public readonly logbookId: string;
  public constructor(id: string) {
    this.logbookId = id;
  }
}

export class CreateLogBookController {
  //injects the logbook use case
  public constructor(private readonly _useCase: CreateLogBookUseCase) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const userId = "fakeUserId";

    const result = await this._useCase.execute({
      name: req.body.name,
      userId,
    });

    const response: CreatedLogbookDto = new CreatedLogbookDto(result.logbookId);

    res.status(201).json(response);
  }
}
