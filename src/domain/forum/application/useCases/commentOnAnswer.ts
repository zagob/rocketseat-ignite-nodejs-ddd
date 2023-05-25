import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/uniqueEntityId";
import { AnswerComment } from "../../enterprise/entities/answerComment";
import { AnswerCommentsRepository } from "../repositories/answerCommentsRepository";
import { AnswersRepository } from "../repositories/answersRepository";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(questionId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return right({
      answerComment,
    });
  }
}
