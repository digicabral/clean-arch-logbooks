import IResponse from "../../../shared/IResponse";
import { GetLogbookUseCase } from "./GetLogbookUseCase";

export class GetLogbookController {
  public constructor(private readonly _useCase: GetLogbookUseCase) {}
  public async handle(id: string): Promise<IResponse> {
    const result = await this._useCase.execute({ id });
    return {
      status: 200,
      data: result,
    };
  }
}
