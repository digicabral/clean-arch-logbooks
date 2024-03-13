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

  public async handle(name: string): Promise<{ status: number; data: any }> {
    const userId = "fakeUserId";

    const result = await this._useCase.execute({
      name,
      userId,
    });

    const response: CreatedLogbookDto = new CreatedLogbookDto(result.logbookId);

    return { status: 201, data: response };
  }
}
