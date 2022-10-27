import axios from "axios";
import { EmailOctopusError } from "src/errors/EmailOctopusError";
import { handleApiGlobalErrors } from "src/handlers/apiGlobalErrorHandler";
import { ApiWideErrorResponses } from "src/types";
import { List } from "./types";

type CreateListProps = {
  name: string;
};

export const createList =
  (apiKey: string) =>
  async (props: CreateListProps): Promise<List> => {
    try {
      const response = await axios.post<List>(
        `https://emailoctopus.com/api/1.6/lists`,
        {
          api_key: apiKey,
          name: props.name,
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
