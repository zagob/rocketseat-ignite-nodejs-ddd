import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/uniqueEntityId";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questionsRepository";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    await this.questionsRepository.create(question);

    return right({
      question,
    });
  }
}
