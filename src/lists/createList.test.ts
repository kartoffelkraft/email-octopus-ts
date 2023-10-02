import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { createList } from "./createList";
import { List } from "./types";
import { EmailOctopusError } from "../emailOctopus";
import { ApiWideErrorResponses } from "../types";

const mockAxios = new AxiosMockAdapter(axios);

describe('CreateList', () => {
    const FAKE_API_KEY = "1c2b40da-5fa3-11ee-8c99-0242ac120002";
    const input = { name: 'Lorem ipsun' };

    it('should return success and status 200', async () => {
        const output: List = {} as List;

        mockAxios.onPost().replyOnce(200, output);
        jest.spyOn(axios, "post");

        const result = await createList(FAKE_API_KEY)(input);

        expect(result).toEqual(output);
        expect(axios.post).toBeCalledWith(
            'https://emailoctopus.com/api/1.6/lists',
            { api_key: FAKE_API_KEY, name: 'Lorem ipsun' }
        );
    });

    it('should throw EmailOctopusError', async () => {
        const output = {
            code: "INTERNAL_SERVER_ERROR",
            message: "Unexpected Error",
        };

        mockAxios.onPost().replyOnce(404, output);
        jest.spyOn(axios, "post");

        const result = await createList(FAKE_API_KEY)(input).catch(
            (error) => error,
        );

        expect(result).toBeInstanceOf(EmailOctopusError);
    });
});
