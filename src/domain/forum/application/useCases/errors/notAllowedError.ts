import { UseCaseError } from "@/core/errors/useCaseError";

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super("Not Allowed");
  }
}
