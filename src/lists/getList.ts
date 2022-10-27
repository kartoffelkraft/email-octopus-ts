import axios from "axios";
import { EmailOctopusError } from "src/errors/EmailOctopusError";
import { ListNotFoundError } from "src/errors/ListNotFoundError";
import { handleApiGlobalErrors } from "src/handlers/apiGlobalErrorHandler";
import { ApiWideErrorResponses } from "src/types";
import { List } from "./types";

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
      const response = await axios.post<List>(
        `https://emailoctopus.com/api/1.6/lists/${props.listId}`,
        {
          api_key: apiKey,
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
