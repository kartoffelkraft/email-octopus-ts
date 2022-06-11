export class EmailOctopusError extends Error {
  code = "EMAIL_OCTOPUS_ERROR";
  message: string = "Generic email octopus error";

  constructor(message?: string) {
    super(message || "Generic email octopus error");

    this.message = message || "Generic email octopus error";
    this.name = "EmailOctopusError";
  }
}
