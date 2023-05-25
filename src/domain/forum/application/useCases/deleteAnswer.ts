import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answersRepository";
import { NotAllowedError } from "./errors/notAllowedError";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);

    return right({});
  }
}
