export class ApiKeyInvalidError extends Error {
  code = "API_KEY_INVALID";
  message: string = "Your API key is invalid.";

  constructor(message?: string) {
    super(message || "Your API key is invalid.");

    this.message = message || "Your API key is invalid.";
    this.name = "ApiKeyInvalidError";
  }
}
