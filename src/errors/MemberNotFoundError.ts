export class MemberNotFoundError extends Error {
  code = "MEMBER_NOT_FOUND";
  message: string = "The contact could not be found.";

  constructor(message?: string) {
    super(
      message || "The contact could not be found.",
    );

    this.message =
      message || "The contact could not be found.";
    this.name = "MemberNotFoundError";
  }
}
