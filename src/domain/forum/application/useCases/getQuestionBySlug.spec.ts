import { makeQuestion } from "test/factories/makeQuestion";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/inMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionRepository } from "test/repositories/inMemoryQuestionsRepository";
import { Slug } from "../../enterprise/entities/valueObject/slug";
import { GetQuestionBySlugUseCase } from "./getQuestionBySlug";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.question.content).toBeTruthy();
      expect(result.value.question.title).toEqual(newQuestion.title);
    }
  });
});
