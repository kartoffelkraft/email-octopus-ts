import axios from "axios";
import {
  ApiKeyInvalidError,
  InvalidParametersError,
  NotFoundError,
  UnauthorisedError,
  emailOctopus,
} from "../emailOctopus";
import AxiosMockAdapter from "axios-mock-adapter";
import { UnknownError } from "../errors/UnknownError";
import { MemberNotFoundError } from "../errors/MemberNotFoundError";

var mock = new AxiosMockAdapter(axios);

describe("deleteContact", () => {
  const FAKE_API_KEY = "351df8ea-52ec-4c5a-a805-85843a292b05";

  it("should delete a contact", async () => {
    mock.onDelete().replyOnce(200);

    const props = {
      listId: "3c53c7e0-30da-415a-a671-8e86893bc595",
      memberId: "e540ce0b-ea34-4864-a886-198f362ff85c"
    };

    const promise = emailOctopus(FAKE_API_KEY).lists.deleteContact(props);
    expect(promise).resolves.toReturn()
  });

  describe("method-specific errors", () => {
    it("should throw an error when MEMBER_EXISTS_WITH_EMAIL_ADDRESS is returned", async () => {
      const mockedData = {
        code: "MEMBER_NOT_FOUND",
        message: "The contact could not be found.",
      };

      mock.onPost().reply(400, mockedData);

      const props = {
        listId: "3c53c7e0-30da-415a-a671-8e86893bc595",
        memberId: "not-a-real-member-id"
      };

      const execution = emailOctopus(FAKE_API_KEY).lists.deleteContact(props);
      expect(execution).rejects.toBeInstanceOf(
        MemberNotFoundError,
      );
    });
  });

  describe("api-wide errors", () => {
    it("should throw an error when INVALID_PARAMETERS is returned", async () => {
      const mockedData = {
        code: "INVALID_PARAMETERS",
        message: "Parameters are missing or invalid.",
      };

      mock.onPost().reply(400, mockedData);

      const props = {
        listId: "invalid-list-id",
        memberId: "e540ce0b-ea34-4864-a886-198f362ff85c"
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.deleteContact(props);
      expect(execution).rejects.toBeInstanceOf(InvalidParametersError);
    });

    it("should throw an error when API_KEY_INVALID is returned", async () => {
      const mockedData = {
        code: "API_KEY_INVALID",
        message: "Your API key is invalid.",
      };

      mock.onPost().reply(401, mockedData);

      const props = {
        listId: "invalid-list-id",
        memberId: "e540ce0b-ea34-4864-a886-198f362ff85c"
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.deleteContact(props);
      expect(execution).rejects.toBeInstanceOf(ApiKeyInvalidError);
    });

    it("should throw an error when UNAUTHORISED is returned", async () => {
      const mockedData = {
        code: "UNAUTHORISED",
        message: "You're not authorised to perform that action.",
      };

      mock.onPost().reply(403, mockedData);

      const props = {
        listId: "invalid-list-id",
        memberId: "e540ce0b-ea34-4864-a886-198f362ff85c"
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.deleteContact(props);
      expect(execution).rejects.toBeInstanceOf(UnauthorisedError);
    });

    it("should throw an error when NOT_FOUND is returned", async () => {
      const mockedData = {
        code: "NOT_FOUND",
        message: "The requested endpoint does not exist.",
      };

      mock.onPost().reply(404, mockedData);

      const props = {
        listId: "invalid-list-id",
        memberId: "e540ce0b-ea34-4864-a886-198f362ff85c"
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.deleteContact(props);
      expect(execution).rejects.toBeInstanceOf(NotFoundError);
    });

    it("should throw an error when UNKNOWN is returned", async () => {
      const mockedData = {
        code: "UNKNOWN",
        message: "An unknown error occurred.",
      };

      mock.onPost().reply(500, mockedData);

      const props = {
        listId: "invalid-list-id",
        memberId: "e540ce0b-ea34-4864-a886-198f362ff85c"
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.deleteContact(props);
      expect(execution).rejects.toBeInstanceOf(UnknownError);
    });
  });
});
