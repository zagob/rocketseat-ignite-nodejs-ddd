import { PaginationParams } from "@/core/repositories/paginationParams";
import { QuestionComment } from "../../enterprise/entities/questionComment";

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}
