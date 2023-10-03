import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { createList } from "./createList";
import { List } from "./types";
import { EmailOctopusError } from "../emailOctopus";

const mockAxios = new AxiosMockAdapter(axios);

describe('createList', () => {
    const FAKE_API_KEY = "1c2b40da-5fa3-11ee-8c99-0242ac120002";
    const input = { name: 'Lorem ipsun' };

    it('should successful request', async () => {
        mockAxios.onPost().replyOnce(200);
        jest.spyOn(axios, "post");

        await createList(FAKE_API_KEY)(input);

        expect(axios.post).toBeCalledWith(
            'https://emailoctopus.com/api/1.6/lists',
            { api_key: FAKE_API_KEY, name: 'Lorem ipsun' }
        );
    });

    it('should return a List and status code 201', async () => {
        const output: List = {} as List;

        mockAxios.onPost().replyOnce(201, output);
        jest.spyOn(axios, "post");

        const result = await createList(FAKE_API_KEY)(input);

        expect(result).toEqual(output);
    });

    it('should throw EmailOctopusError to unmaped type error', async () => {
        const output = {
            code: undefined,
            message: "Unexpected Error",
        };

        mockAxios.onPost().replyOnce(500, output);
        jest.spyOn(axios, "post");

        const result = await createList(FAKE_API_KEY)(input).catch(
            (error) => error,
        );

        expect(result).toBeInstanceOf(EmailOctopusError);
    });

    it('should throw TypeError to no content response', async () => {
        mockAxios.onPost().replyOnce(500);
        jest.spyOn(axios, "post");

        const result = await createList(FAKE_API_KEY)(input).catch(
            (error) => error,
        );

        expect(result).toBeInstanceOf(TypeError);
    });

});
