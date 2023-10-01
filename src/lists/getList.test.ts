import axios, { AxiosError, AxiosResponse } from "axios";
import { getList } from "./getList";
import { ListNotFoundError } from "../errors/ListNotFoundError";
import {
  EmailOctopusError,
  ApiKeyInvalidError,
  InvalidParametersError,
  NotFoundError,
  UnauthorisedError,
} from "../emailOctopus";
import { UnknownError } from "../errors/UnknownError";
import AxiosMockAdapter from "axios-mock-adapter";

const mockAxios = new AxiosMockAdapter(axios);

describe("getList", () => {
  const FAKE_API_KEY = "1c2b40da-5fa3-11ee-8c99-0242ac120002";
  const listId = "fakeListId";

  describe("request successful", () => {
    it("should return the list", async () => {
      const expectedList = {
        id: listId,
        name: "List 1",
      };

      mockAxios.onGet().replyOnce(200, expectedList);
      jest.spyOn(axios, "get");

      const result = await getList(FAKE_API_KEY)({ listId });

      expect(axios.get).toBeCalledWith(
        `https://emailoctopus.com/api/1.6/lists/${listId}`,
        { params: { api_key: FAKE_API_KEY } },
      );
      expect(result).toEqual(expectedList);
    });
  });

  describe("request with error", () => {
    describe("indicates list not found", () => {
      it("should throw ListNotFoundError", async () => {
        const mockError = {
          code: "LIST_NOT_FOUND",
          message: "List not found",
        };

        mockAxios.onGet().replyOnce(404, mockError);

        const result = await getList(FAKE_API_KEY)({ listId }).catch(
          (error) => error,
        );

        expect(result).toBeInstanceOf(ListNotFoundError);
      });
    });

    describe("indicates global errors", () => {
      describe("with invalid parameters", () => {
        it("should throw InvalidParametersError", async () => {
          const mockError = {
            code: "INVALID_PARAMETERS",
            message: "Invalid parameters",
          };

          mockAxios.onGet().replyOnce(400, mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(InvalidParametersError);
        });
      });

      describe("with invalid api key", () => {
        it("should throw ApiKeyInvalidError", async () => {
          const mockError = {
            code: "API_KEY_INVALID",
            message: "Invalid API key",
          };

          mockAxios.onGet().replyOnce(401, mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(ApiKeyInvalidError);
        });
      });

      describe("with not authorized", () => {
        it("should throw UnauthorisedError", async () => {
          const mockError = {
            code: "UNAUTHORISED",
            message: "Not authorized",
          };

          mockAxios.onGet().replyOnce(401, mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(UnauthorisedError);
        });
      });

      describe("with not found", () => {
        it("should throw NotFoundError", async () => {
          const mockError = {
            code: "NOT_FOUND",
            message: "Not found",
          };

          mockAxios.onGet().replyOnce(404, mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(NotFoundError);
        });
      });

      describe("with unknown", () => {
        it("should throw UnknownError", async () => {
          const mockError = {
            code: "UNKNOWN",
            message: "Unknown error",
          };

          mockAxios.onGet().replyOnce(500, mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(UnknownError);
        });
      });
    });

    describe("indicates generic error", () => {
      it("should throw EmailOctopusError", async () => {
        mockAxios.onGet().replyOnce(500, {});

        const result = await getList(FAKE_API_KEY)({ listId }).catch(
          (error) => error,
        );

        expect(result).toBeInstanceOf(EmailOctopusError);
      });
    });
  });
});
