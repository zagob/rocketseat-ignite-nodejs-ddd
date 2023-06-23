import { WatchedList } from "@/core/entities/watchedList";
import { AnswerAttachment } from "./answerAttachment";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId === b.attachmentId;
  }
}
