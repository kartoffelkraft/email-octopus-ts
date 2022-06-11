import axios from "axios";

type CreateContactProps = {
  listId: string;
  emailAddress: string;
  fields?: Record<string, unknown>;
  tags?: Array<string>;
  status?: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING";
};

type CreateContactOptions = {};

type CreateContactResponse = {
  id: string;
  email_address: string;
  fields: Record<string, unknown>;
  tags: Array<string>;
  status: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING";
  created_at: string;
};

export const createContact =
  (apiKey: string) =>
  async (
    props: CreateContactProps,
    options?: CreateContactOptions,
  ): Promise<CreateContactResponse> => {
    const response = await axios.post<CreateContactResponse>(
      `https://emailoctopus.com/api/1.6/lists/${props.listId}/contacts`,
      {
        api_key: apiKey,
        email_address: props.emailAddress,
        ...(props.fields && { fields: props.fields }),
        ...(props.tags && { tags: props.tags }),
        ...(props.status && { status: props.status }),
      },
    );
    return response.data;

    // https://emailoctopus.com/api/1.6/lists/:listId/contacts
  };
