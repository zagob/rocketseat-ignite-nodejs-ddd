import { UniqueEntityID } from "@/core/entities/uniqueEntityId";
import { makeAnswerComment } from "test/factories/makeAnswerComment";
import { InMemoryAnswerCommentsRepository } from "test/repositories/inMemoryAnswerCommentsRepository";
import { FetchAnswerCommentsUseCase } from "./fetchAnswerComments";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch Answer Comments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository);
  });

  it("should be able to fetch answer comments", async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      })
    );

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      })
    );

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      })
    );

    const result = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(result.value?.answerComments).toHaveLength(3);
  });

  it("should be able to fetch paginated answer comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID("answer-1"),
        })
      );
    }

    const result = await sut.execute({
      answerId: "answer-1",
      page: 2,
    });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});
