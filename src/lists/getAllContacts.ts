import axios from "axios";
import { ApiKeyInvalidError } from "src/errors/ApiKeyInvalidError";
import { InvalidParametersError } from "src/errors/InvalidParametersError";
import { UnauthorisedError } from "src/errors/UnauthorisedError";
import { EmailOctopusError } from "../errors/EmailOctopusError";

type GetAllContactsProps = {
  listId: string;
  limit?: number;
  page?: number;
};

type GetAllContactsOptions = {
  autoPaginate?: boolean;
};

type Contact = {
  id: string;
  email_address: string;
  fields: Record<string, unknown>;
  tags: Array<string>;
  status: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING";
  created_at: string;
};

type GetAllContactsResponse = {
  data: Array<Contact>;
  paging: {
    previous: null | string;
    next: null | string;
  };
};

type GetAllContactsError = {
  code:
    | "INVALID_PARAMETERS"
    | "API_KEY_INVALID"
    | "UNAUTHORISED"
    | "NOT_FOUND"
    | "UNKNOWN";
  message: string;
};

export const getAllContacts =
  (apiKey: string) =>
  async (props: GetAllContactsProps, options?: GetAllContactsOptions) => {
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
        const errorData = error.response?.data as GetAllContactsError;
        if (error.code === "INVALID_PARAMETERS") {
          throw new InvalidParametersError(errorData.message);
        }
        if (error.code === "API_KEY_INVALID") {
          throw new ApiKeyInvalidError(errorData.message);
        }
        if (error.code === "UNAUTHORISED") {
          throw new UnauthorisedError(errorData.message);
        }
        if (error.code === "NOT_FOUND") {
          throw new NotFoundError(errorData.message);
        }
      }
      throw new EmailOctopusError();
    }
    return contacts;
  };
