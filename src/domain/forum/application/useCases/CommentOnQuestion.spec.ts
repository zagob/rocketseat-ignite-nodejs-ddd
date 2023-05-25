import { makeQuestion } from "test/factories/makeQuestion";
import { InMemoryQuestionCommentsRepository } from "test/repositories/inMemoryQuestionCommentsRepository";
import { InMemoryQuestionRepository } from "test/repositories/inMemoryQuestionsRepository";
import { CommentOnQuestionUseCase } from "./commentOnQuestion";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it("should be able to comment on question", async () => {
    const newQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      content: newQuestion.content,
    });

    // expect(inMemoryQuestionsRepository.items[0].content).toEqual(
    //   result.value..content
    // );
  });
});
