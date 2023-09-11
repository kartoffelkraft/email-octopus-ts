import axios from "axios";
import { List, Paging } from "./types";
import { EmailOctopusError } from "../emailOctopus";
import { handleApiGlobalErrors } from "../handlers/apiGlobalErrorHandler";
import { ApiWideErrorResponses } from "../types";

type GetAllListProps = {
  limit?: number;
  page?: number;
};

type AllLists = {
  data: Array<List>;
  paging: Paging;
};

export const getAllLists =
  (apiKey: string) =>
  async (props: GetAllListProps): Promise<AllLists> => {
    try {
      const response = await axios.get<AllLists>(
        `https://emailoctopus.com/api/1.6/lists`,
        {
          params: {
            api_key: apiKey,
            limit: props.limit || 100,
            page: props.page || 1,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response?.data as ApiWideErrorResponses;

        handleApiGlobalErrors(error, errorData);
      }
      throw new EmailOctopusError();
    }
  };
