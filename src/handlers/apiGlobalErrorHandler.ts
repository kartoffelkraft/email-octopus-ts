import { AxiosError } from "axios";
import { ApiKeyInvalidError } from "src/errors/ApiKeyInvalidError";
import { InvalidParametersError } from "src/errors/InvalidParametersError";
import { NotFoundError } from "src/errors/NotFoundError";
import { UnauthorisedError } from "src/errors/UnauthorisedError";
import { UnknownError } from "src/errors/UnknownError";
import { ApiWideErrorResponses } from "src/types";

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
