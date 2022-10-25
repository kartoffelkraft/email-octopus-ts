export class UnknownError extends Error {
  code = "UNKNOWN";
  message: string = "An unknown error has occurred.";

  constructor(message?: string) {
    super(message || "An unknown error has occurred.");

    this.message = message || "An unknown error has occurred.";
    this.name = "UnknownError";
  }
}
