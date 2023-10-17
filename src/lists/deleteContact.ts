import axios from "axios";
import {
  EmailOctopusError,
} from "../emailOctopus";
import { handleApiGlobalAxiosErrors } from "../handlers/apiGlobalAxiosErrorHandler";
import { ApiWideErrorResponses } from "../types";
import { MemberNotFoundError } from "../errors/MemberNotFoundError";

export type DeleteContactProps = {
  listId: string;
  memberId: string;
};

type CreateContactErrorResponse = {
  code: "MEMBER_NOT_FOUND";
  message: string;
};

export const deleteContact =
  (apiKey: string) =>
  async (props: DeleteContactProps): Promise<void> => {
    try {
      await axios.post(
        `https://emailoctopus.com/api/1.6/lists/${props.listId}/contacts/${props.memberId}`,
        {
          api_key: apiKey,
        },
      );
      return;
    } catch (error) {
      const isAxiosError = axios.isAxiosError(error);
      if (isAxiosError && error.response) {
        const errorData = error.response?.data as
          | ApiWideErrorResponses
          | CreateContactErrorResponse;
        if (errorData.code === "MEMBER_NOT_FOUND") {
          throw new MemberNotFoundError();
        }
        handleApiGlobalAxiosErrors(error, errorData);
      }
      throw new EmailOctopusError();
    }
  };
