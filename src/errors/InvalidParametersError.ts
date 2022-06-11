export class InvalidParametersError extends Error {
  code = "INVALID_PARAMETERS";
  message: string = "Parameters are missing or invalid.";

  constructor(message?: string) {
    super(message || "Parameters are missing or invalid.");

    this.message = message || "Parameters are missing or invalid.";
    this.name = "InvalidParametersError";
  }
}
