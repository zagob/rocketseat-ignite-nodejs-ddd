import { PaginationParams } from "@/core/repositories/paginationParams";
import { AnswerComment } from "../../enterprise/entities/answerComment";

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>;
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams
  ): Promise<AnswerComment[]>;
  create(answerComment: AnswerComment): Promise<void>;
  delete(answerComment: AnswerComment): Promise<void>;
}
