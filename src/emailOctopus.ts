import { ApiKeyInvalidError } from "./errors/ApiKeyInvalidError";
import { EmailOctopusError } from "./errors/EmailOctopusError";
import { InvalidParametersError } from "./errors/InvalidParametersError";
import { MemberExistsWithEmailAddressError } from "./errors/MemberExistsWithEmailAddressError";
import { NotFoundError } from "./errors/NotFoundError";
import { UnauthorisedError } from "./errors/UnauthorisedError";
import { createContact } from "./lists/createContact";
import { getAllContacts } from "./lists/getAllContacts";

export {
  ApiKeyInvalidError,
  EmailOctopusError,
  InvalidParametersError,
  MemberExistsWithEmailAddressError,
  NotFoundError,
  UnauthorisedError,
};

export const emailOctopus = (apiKey: string) => {
  return {
    lists: {
      getAllContacts: getAllContacts(apiKey),
      createContact: createContact(apiKey),
    },
  };
};
