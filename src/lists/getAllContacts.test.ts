import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { getAllContacts } from "./getAllContacts";
import { Contact } from "../types";
import { Paging } from "./types";
import { EmailOctopusError } from "../emailOctopus";

const mockAxios = new AxiosMockAdapter(axios);

describe('getAllContacts', () => {
    afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const FAKE_API_KEY = "1c2b40da-5fa3-11ee-8c99-0242ac120002";

    describe('Success Cases', () => {
        it('should successful request when autoPaginate is false', async () => {
            const props = {
                listId: "string",
                limit: 1,
                page: 1,
            };

            const options = { autoPaginate: false }

            const output = { data: [{} as Contact] } as {
                data: Contact[];
                paging: Paging;
            }

            mockAxios.onGet().replyOnce(200, output);

            jest.spyOn(axios, "get")
            await getAllContacts(FAKE_API_KEY)(props, options);

            expect(axios.get).toBeCalledWith(
                `https://emailoctopus.com/api/1.6/lists/string/contacts`,
                {
                    params: { api_key: FAKE_API_KEY, limit: 1, page: 1 }
                }
            );
        });

        it('should successful request autoPaginate is true', async () => {
            const options = { autoPaginate: true }
            const output = {
                data: [{} as Contact],
                paging: { next: null }
            }

            mockAxios.onGet().replyOnce(200, output);
            jest.spyOn(axios, "get");

            await getAllContacts(FAKE_API_KEY)({} as any, options);

            expect(axios.get).toBeCalledWith(
                `https://emailoctopus.com/api/1.6/lists/string/contacts`,
                {
                    params: { api_key: FAKE_API_KEY, limit: 1, page: 1 }
                }
            );
        });

        it('should successful request with default params', async () => {
            const props = {
                listId: "string",
            };

            const output = { data: [{} as Contact] } as {
                data: Contact[];
                paging: Paging;
            }

            mockAxios.onGet().replyOnce(200, output);
            jest.spyOn(axios, "get");

            await getAllContacts(FAKE_API_KEY)(props, {} as any);

            expect(axios.get).toBeCalledWith(
                `https://emailoctopus.com/api/1.6/lists/string/contacts`,
                {
                    params: { api_key: FAKE_API_KEY, limit: 100, page: 1 }
                }
            );
        });
    });


    describe('Error cases', () => {
        it('should throw EmailOctopusError error on status 400 and invalid code', async () => {
            const output = {
                code: {},
                message: "Invalid API key",
            };

            mockAxios.onGet().replyOnce(400, output);
            jest.spyOn(axios, "get");

            const response = await getAllContacts(FAKE_API_KEY)({} as any).catch((error) => error);;

            expect(response).toBeInstanceOf(EmailOctopusError);
        });

        it('should throw TypeError error on status 500 and no content data', async () => {
            mockAxios.onGet().replyOnce(500);
            jest.spyOn(axios, "get");

            const response = await getAllContacts(FAKE_API_KEY)({} as any).catch((error) => error);;

            expect(response).toBeInstanceOf(TypeError);
        });
    });
});
