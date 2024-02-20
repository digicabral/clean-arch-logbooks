import { Request, Response } from "express";
import {
  CreateLogBookUseCase,
  ICreateLogbookResult,
} from "../application/CreateLogbookUseCase";

export class CreatedLogbookDto implements ICreateLogbookResult {
  public readonly logbookId: string;
}

export class CreateLogBookController {
  //injects the logbook use case
  public constructor(private readonly _useCase: CreateLogBookUseCase) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const userId = "fakeUserId";

    const response = await this._useCase.execute({
      name: req.body.name,
      userId,
    });

    res.status(201).json({ id: response.logbookId });
  }
}
