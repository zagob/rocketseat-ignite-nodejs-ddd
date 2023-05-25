import { makeAnswer } from "test/factories/makeAnswer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/inMemoryAnswerCommentsRepository";
import { InMemoryAnswersRepository } from "test/repositories/inMemoryAnswersRepository";
import { CommentOnAnswerUseCase } from "./commentOnAnswer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      questionId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: answer.content,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryAnswersRepository.items[0].content).toEqual(
        result.value?.answerComment.content
      );
    }
  });
});
