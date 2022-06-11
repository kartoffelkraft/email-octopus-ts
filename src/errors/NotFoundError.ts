export class NotFoundError extends Error {
  code = "NOT_FOUND";
  message: string = "The requested endpoint does not exist.";

  constructor(message?: string) {
    super(message || "The requested endpoint does not exist.");

    this.message = message || "The requested endpoint does not exist.";
    this.name = "NotFoundError";
  }
}
