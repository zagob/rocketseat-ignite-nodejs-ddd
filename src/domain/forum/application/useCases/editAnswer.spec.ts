import { UniqueEntityID } from "@/core/entities/uniqueEntityId";
import { makeAnswer } from "test/factories/makeAnswer";
import { InMemoryAnswersRepository } from "test/repositories/inMemoryAnswersRepository";
import { EditAnswerUseCase } from "./editAnswer";
import { NotAllowedError } from "./errors/notAllowedError";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to Edit a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      content: "Conteudo teste",
      answerId: newAnswer.id.toValue(),
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Conteudo teste",
    });
  });

  it("should not be able to Edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "author-2",
      content: "Conteudo teste",
      answerId: newAnswer.id.toValue(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
