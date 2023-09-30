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

jest.mock("axios", () => {
  const originalModule = jest.requireActual("axios");
  return {
    ...originalModule,
    get: jest.fn(),
  };
});

describe("getList", () => {
  const FAKE_API_KEY = "1c2b40da-5fa3-11ee-8c99-0242ac120002";
  const listId = "fakeListId";

  describe("request successful", () => {
    it("should return the list", async () => {
      const expectedList = {
        id: listId,
        name: "List 1",
      };

      const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>;
      mockAxios.mockResolvedValue({ data: expectedList });

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
        const mockError = new AxiosError("List not found");
        mockError.response = {
          data: {
            code: "LIST_NOT_FOUND",
          },
        } as AxiosResponse;

        const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>;
        mockAxios.mockRejectedValue(mockError);

        const result = await getList(FAKE_API_KEY)({ listId }).catch(
          (error) => error,
        );

        expect(result).toBeInstanceOf(ListNotFoundError);
      });
    });

    describe("indicates global errors", () => {
      describe("with invalid parameters", () => {
        it("should throw InvalidParametersError", async () => {
          const mockError = new AxiosError("Invalid Parameters");
          mockError.response = {
            data: {
              code: "INVALID_PARAMETERS",
            },
          } as AxiosResponse;

          const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>;
          mockAxios.mockRejectedValue(mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(InvalidParametersError);
        });
      });

      describe("with invalid api key", () => {
        it("should throw ApiKeyInvalidError", async () => {
          const mockError = new AxiosError("Invalid Parameters");
          mockError.response = {
            data: {
              code: "API_KEY_INVALID",
            },
          } as AxiosResponse;

          const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>;
          mockAxios.mockRejectedValue(mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(ApiKeyInvalidError);
        });
      });

      describe("with not authorized", () => {
        it("should throw UnauthorisedError", async () => {
          const mockError = new AxiosError("Invalid Parameters");
          mockError.response = {
            data: {
              code: "UNAUTHORISED",
            },
          } as AxiosResponse;

          const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>;
          mockAxios.mockRejectedValue(mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(UnauthorisedError);
        });
      });

      describe("with not found", () => {
        it("should throw NotFoundError", async () => {
          const mockError = new AxiosError("Invalid Parameters");
          mockError.response = {
            data: {
              code: "NOT_FOUND",
            },
          } as AxiosResponse;

          const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>;
          mockAxios.mockRejectedValue(mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(NotFoundError);
        });
      });

      describe("with unknown", () => {
        it("should throw UnknownError", async () => {
          const mockError = new AxiosError("Invalid Parameters");
          mockError.response = {
            data: {
              code: "UNKNOWN",
            },
          } as AxiosResponse;

          const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>;
          mockAxios.mockRejectedValue(mockError);

          const result = await getList(FAKE_API_KEY)({ listId }).catch(
            (error) => error,
          );

          expect(result).toBeInstanceOf(UnknownError);
        });
      });
    });

    describe("indicates generic error", () => {
      it("should throw EmailOctopusError", async () => {
        const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>;
        mockAxios.mockRejectedValue(new Error("generic error"));

        const result = await getList(FAKE_API_KEY)({ listId }).catch(
          (error) => error,
        );

        expect(result).toBeInstanceOf(EmailOctopusError);
      });
    });
  });
});
