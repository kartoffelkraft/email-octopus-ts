import { getAllContacts } from "./lists/getAllContacts";

type EmailOctopusOptions = {
  version: "1.5" | "1.6";
};

export const emailOctopus = (
  apiKey: string,
  EmailOctopusOptions?: EmailOctopusOptions,
) => {
  const options = EmailOctopusOptions || { version: "1.5" };

  return {
    lists: {
      getAllContacts: getAllContacts(apiKey),
    },
  };
};
