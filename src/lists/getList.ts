import axios from "axios";
import { List } from "./types";
import { EmailOctopusError } from "../emailOctopus";
import { ListNotFoundError } from "../errors/ListNotFoundError";
import { handleApiGlobalErrors } from "../handlers/apiGlobalErrorHandler";
import { ApiWideErrorResponses } from "../types";

type GetListProps = {
  listId: string;
};

type GetListErrorListNotFound = {
  code: "LIST_NOT_FOUND";
  message: string;
};

export const getList =
  (apiKey: string) =>
  async (props: GetListProps): Promise<List> => {
    try {
      const response = await axios.get<List>(
        `https://emailoctopus.com/api/1.6/lists/${props.listId}`,
        {
          params: {
            api_key: apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response?.data as
          | ApiWideErrorResponses
          | GetListErrorListNotFound;
        if (errorData.code === "LIST_NOT_FOUND") {
          throw new ListNotFoundError();
        }
        handleApiGlobalErrors(error, errorData);
      }
      throw new EmailOctopusError();
    }
  };
