export class UnauthorisedError extends Error {
  code = "UNAUTHORISED";
  message: string = "You're not authorised to perform that action.";

  constructor(message?: string) {
    super(message || "You're not authorised to perform that action.");

    this.message = message || "You're not authorised to perform that action.";
    this.name = "UnauthorisedError";
  }
}
