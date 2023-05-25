import { UniqueEntityID } from "@/core/entities/uniqueEntityId";
import { makeAnswer } from "test/factories/makeAnswer";
import { makeQuestion } from "test/factories/makeQuestion";
import { InMemoryAnswersRepository } from "test/repositories/inMemoryAnswersRepository";
import { InMemoryQuestionRepository } from "test/repositories/inMemoryQuestionsRepository";
import { ChooseQuestionBestAnswerUseCase } from "./chooseQuestionBestAnswer";
import { NotAllowedError } from "./errors/notAllowedError";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    );
  });

  it("should be able to choose a question best answer", async () => {
    const newQuestion = makeQuestion();
    const answer = makeAnswer({
      questionId: newQuestion.id,
    });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id
    );
  });

  it("should not be able to choose another use question best answer", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    const answer = makeAnswer({
      questionId: newQuestion.id,
    });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
