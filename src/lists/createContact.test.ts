import axios from "axios";
import {
  ApiKeyInvalidError,
  InvalidParametersError,
  MemberExistsWithEmailAddressError,
  NotFoundError,
  UnauthorisedError,
  emailOctopus,
} from "../emailOctopus";
import AxiosMockAdapter from "axios-mock-adapter";
import { UnknownError } from "../errors/UnknownError";

var mock = new AxiosMockAdapter(axios);

describe("createContact", () => {
  const FAKE_API_KEY = "351df8ea-52ec-4c5a-a805-85843a292b05";

  it("should create a contact", async () => {
    const mockedData = {
      id: "3c53c7e0-30da-415a-a671-8e86893bc595",
      email_address: "kevinigeligeligel@gmail.com",
      fields: {},
      tags: [],
      status: "PENDING",
      created_at: "2021-10-10T15: 44: 00.000Z",
    };
    mock.onPost().replyOnce(200, mockedData);

    const props = {
      listId: "3c53c7e0-30da-415a-a671-8e86893bc595",
      emailAddress: "kevinigeligeligel@gmail.com",
    };

    const result = await emailOctopus(FAKE_API_KEY).lists.createContact(props);
    expect(result).toEqual(mockedData);
  });

  describe("method-specific errors", () => {
    it("should throw an error when MEMBER_EXISTS_WITH_EMAIL_ADDRESS is returned", async () => {
      const mockedData = {
        code: "MEMBER_EXISTS_WITH_EMAIL_ADDRESS",
        message: "A contact already exists with the supplied email address.",
      };

      mock.onPost().reply(400, mockedData);

      const props = {
        listId: "3c53c7e0-30da-415a-a671-8e86893bc595",
        emailAddress: "kevinigeligeligel@gmail.com",
      };

      const execution = emailOctopus(FAKE_API_KEY).lists.createContact(props);
      expect(execution).rejects.toBeInstanceOf(
        MemberExistsWithEmailAddressError,
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
        emailAddress: "kevinigeligeligel@gmail.com",
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.createContact(props);
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
        emailAddress: "kevinigeligeligel@gmail.com",
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.createContact(props);
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
        emailAddress: "kevinigeligeligel@gmail.com",
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.createContact(props);
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
        emailAddress: "kevinigeligeligel@gmail.com",
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.createContact(props);
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
        emailAddress: "kevinigeligeligel@gmail.com",
      };
      const execution = emailOctopus(FAKE_API_KEY).lists.createContact(props);
      expect(execution).rejects.toBeInstanceOf(UnknownError);
    });
  });
});
