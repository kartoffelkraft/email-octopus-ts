import axios from "axios";
import { getAllLists } from "./getAllLists";
import {
  EmailOctopusError,
  ApiKeyInvalidError,
  InvalidParametersError,
  NotFoundError,
  UnauthorisedError,
} from "../emailOctopus";
import { UnknownError } from "../errors/UnknownError";
import AxiosMockAdapter from "axios-mock-adapter";
import type { List, Paging } from "./types";

const mockAxios = new AxiosMockAdapter(axios);

describe("getAllLists", () => {
  const FAKE_API_KEY = "084b555a-25ea-4709-8e15-2e662708f14a";

  describe("request successful", () => {
    describe("with pagination parameters option", () => {
      let expectedListAllList: {
        data: List[];
        paging: Paging;
      };

      beforeAll(() => {
        expectedListAllList = {
          data: [
            {
              id: "ff62e24d-c325-4fe1-98a9-4a394bc65650",
              name: "Example list name 03",
              double_opt_in: false,
              fields: [],
              counts: {
                pending: 0,
                subscribed: 5,
                unsubscribed: 0,
              },
              created_at: "2023-09-30T00:00:00+00:00",
            },
            {
              id: "369240b9-19ae-4e58-b4a0-ed1895570d28",
              name: "Example list name 04",
              double_opt_in: false,
              fields: [],
              counts: {
                pending: 0,
                subscribed: 5,
                unsubscribed: 0,
              },
              created_at: "2023-09-30T00:00:00+00:00",
            },
          ],
          paging: {
            next: "3",
            previous: "1",
          },
        };

        mockAxios.onGet().replyOnce(200, expectedListAllList);
        jest.spyOn(axios, "get");
      });

      afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
      });

      it("should return the list with paging", async () => {
        const fakeLimit = 2;
        const fakePage = 2;

        const result = await getAllLists(FAKE_API_KEY)({
          limit: fakeLimit,
          page: fakePage,
        });

        expect(axios.get).toBeCalledWith(
          `https://emailoctopus.com/api/1.6/lists`,
          {
            params: { api_key: FAKE_API_KEY, limit: fakeLimit, page: fakePage },
          },
        );
        expect(result).toEqual(expectedListAllList);
      });
    });

    describe("no pagination parameters option", () => {
      let expectedListAllList: {
        data: List[];
        paging: Paging;
      };

      beforeAll(() => {
        expectedListAllList = {
          data: [
            {
              id: "ff62e24d-c325-4fe1-98a9-4a394bc65650",
              name: "Example list name 01",
              double_opt_in: false,
              fields: [],
              counts: {
                pending: 0,
                subscribed: 5,
                unsubscribed: 0,
              },
              created_at: "2023-09-30T00:00:00+00:00",
            },
            {
              id: "369240b9-19ae-4e58-b4a0-ed1895570d28",
              name: "Example list name 02",
              double_opt_in: false,
              fields: [],
              counts: {
                pending: 0,
                subscribed: 5,
                unsubscribed: 0,
              },
              created_at: "2023-09-30T00:00:00+00:00",
            },
          ],
          paging: {
            next: "2",
            previous: null,
          },
        };

        mockAxios.onGet().replyOnce(200, expectedListAllList);
        jest.spyOn(axios, "get");
      });

      afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
      });

      it("should return the list", async () => {
        const result = await getAllLists(FAKE_API_KEY)({});

        expect(axios.get).toBeCalledWith(
          `https://emailoctopus.com/api/1.6/lists`,
          { params: { api_key: FAKE_API_KEY, limit: 100, page: 1 } },
        );
        expect(result).toEqual(expectedListAllList);
      });
    });
  });

  describe("request with error", () => {
    describe("indicates global errors", () => {
      describe("with invalid parameters", () => {
        it("should throw InvalidParametersError", async () => {
          const fakeLimit = undefined;
          const fakePage = undefined;

          const mockError = {
            code: "INVALID_PARAMETERS",
            message: "Invalid parameters",
          };

          mockAxios.onGet().replyOnce(400, mockError);

          const result = await getAllLists(FAKE_API_KEY)({
            limit: fakeLimit,
            page: fakePage,
          }).catch((error) => error);

          expect(result).toBeInstanceOf(InvalidParametersError);
        });
      });

      describe("with invalid api key", () => {
        it("should throw ApiKeyInvalidError", async () => {
          const fakeLimit = 2;
          const fakePage = 1;

          const mockError = {
            code: "API_KEY_INVALID",
            message: "Invalid API key",
          };

          mockAxios.onGet().replyOnce(401, mockError);

          const result = await getAllLists(FAKE_API_KEY)({
            limit: fakeLimit,
            page: fakePage,
          }).catch((error) => error);

          expect(result).toBeInstanceOf(ApiKeyInvalidError);
        });
      });

      describe("with not authorized", () => {
        it("should throw UnauthorisedError", async () => {
          const fakeLimit = 2;
          const fakePage = 1;

          const mockError = {
            code: "UNAUTHORISED",
            message: "Not authorized",
          };

          mockAxios.onGet().replyOnce(401, mockError);

          const result = await getAllLists(FAKE_API_KEY)({
            limit: fakeLimit,
            page: fakePage,
          }).catch((error) => error);

          expect(result).toBeInstanceOf(UnauthorisedError);
        });
      });

      describe("with not found", () => {
        it("should throw NotFoundError", async () => {
          const fakeLimit = 2;
          const fakePage = 1;

          const mockError = {
            code: "NOT_FOUND",
            message: "Not found",
          };

          mockAxios.onGet().replyOnce(404, mockError);

          const result = await getAllLists(FAKE_API_KEY)({
            limit: fakeLimit,
            page: fakePage,
          }).catch((error) => error);

          expect(result).toBeInstanceOf(NotFoundError);
        });
      });

      describe("with unknown", () => {
        it("should throw UnknownError", async () => {
          const fakeLimit = 2;
          const fakePage = 1;

          const mockError = {
            code: "UNKNOWN",
            message: "Unknown error",
          };

          mockAxios.onGet().replyOnce(500, mockError);

          const result = await getAllLists(FAKE_API_KEY)({
            limit: fakeLimit,
            page: fakePage,
          }).catch((error) => error);

          expect(result).toBeInstanceOf(UnknownError);
        });
      });
    });

    describe("indicates generic error", () => {
      it("should throw EmailOctopusError", async () => {
        const fakeLimit = 2;
        const fakePage = 1;

        mockAxios.onGet().replyOnce(500, {});

        const result = await getAllLists(FAKE_API_KEY)({
          limit: fakeLimit,
          page: fakePage,
        }).catch((error) => error);

        expect(result).toBeInstanceOf(EmailOctopusError);
      });
    });
  });
});
