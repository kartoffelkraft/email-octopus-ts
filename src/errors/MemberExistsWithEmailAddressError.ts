export class MemberExistsWithEmailAddressError extends Error {
  code = "MEMBER_EXISTS_WITH_EMAIL_ADDRESS";
  message: string = "A contact already exists with the supplied email address.";

  constructor(message?: string) {
    super(
      message || "A contact already exists with the supplied email address.",
    );

    this.message =
      message || "A contact already exists with the supplied email address.";
    this.name = "MemberExistsWithEmailAddressError";
  }
}
