import { AxiosError } from "axios";
import {
  InvalidParametersError,
  ApiKeyInvalidError,
  UnauthorisedError,
  NotFoundError,
} from "../emailOctopus";
import { UnknownError } from "../errors/UnknownError";
import { ApiWideErrorResponses } from "../types";

export const handleApiGlobalErrors = (
  error: AxiosError,
  errorData: ApiWideErrorResponses,
): void => {
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
  if (error.code === "UNKNOWN") {
    throw new UnknownError(errorData.message);
  }
};
