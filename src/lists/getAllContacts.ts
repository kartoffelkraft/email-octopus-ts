import axios from "axios";
import { handleApiGlobalErrors } from "src/handlers/apiGlobalErrorHandler";
import { ApiWideErrorResponses, Contact } from "src/types";
import { EmailOctopusError } from "../errors/EmailOctopusError";
import { Paging } from "./types";

type GetAllContactsProps = {
  listId: string;
  limit?: number;
  page?: number;
};

type GetAllContactsOptions = {
  autoPaginate?: boolean;
};

type GetAllContactsResponse = {
  data: Array<Contact>;
  paging: Paging;
};

export const getAllContacts =
  (apiKey: string) =>
  async (
    props: GetAllContactsProps,
    options?: GetAllContactsOptions,
  ): Promise<Array<Contact>> => {
    let page = (options?.autoPaginate ? 1 : props.page) || 1;

    let next: null | string = "next-initial";

    let contacts: Array<Contact> = [];
    try {
      do {
        const response = await axios.get<GetAllContactsResponse>(
          `https://emailoctopus.com/api/1.6/lists/${props.listId}/contacts`,
          {
            params: {
              api_key: apiKey,
              limit: props.limit || 100,
              page,
            },
          },
        );
        contacts.push(...response.data.data);
        if (options?.autoPaginate) {
          page += 1;
          next = response.data.paging.next;
        } else {
          next = null;
        }
      } while (next !== null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response?.data as ApiWideErrorResponses;
        handleApiGlobalErrors(error, errorData);
      }
      throw new EmailOctopusError();
    }
    return contacts;
  };
