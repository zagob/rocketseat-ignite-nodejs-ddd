import { UniqueEntityID } from "@/core/entities/uniqueEntityId";
import { makeQuestion } from "test/factories/makeQuestion";
import { InMemoryQuestionRepository } from "test/repositories/inMemoryQuestionsRepository";
import { EditQuestionUseCase } from "./editQuestion";
import { NotAllowedError } from "./errors/notAllowedError";

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to Edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      title: "Pergunta teste",
      content: "Conteudo teste",
      questionId: newQuestion.id.toValue(),
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Pergunta teste",
      content: "Conteudo teste",
    });
  });

  it("should not be able to Edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "author-2",
      title: "Pergunta teste",
      content: "Conteudo teste",
      questionId: newQuestion.id.toValue(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
