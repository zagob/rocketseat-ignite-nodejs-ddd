import { UniqueEntityID } from "@/core/entities/uniqueEntityId";
import { makeQuestionComment } from "test/factories/makeQuestionComment";
import { InMemoryQuestionCommentsRepository } from "test/repositories/inMemoryQuestionCommentsRepository";
import { FetchQuestionCommentsUseCase } from "./fetchQuestionComments";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch Question Comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentRepository);
  });

  it("should be able to fetch question comments", async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    );

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    );

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.questionComments).toHaveLength(3);
  });

  it("should be able to fetch paginated question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID("question-1"),
        })
      );
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.value?.questionComments).toHaveLength(2);
  });
});
