export class ListNotFoundError extends Error {
  code = "LIST_NOT_FOUND";
  message: string = "The list could not be found.";

  constructor(message?: string) {
    super(message || "The list could not be found.");

    this.message = message || "The list could not be found.";
    this.name = "ListNotFoundError";
  }
}
