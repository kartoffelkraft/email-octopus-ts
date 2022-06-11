import { createContact } from "./lists/createContact";
import { getAllContacts } from "./lists/getAllContacts";

export const emailOctopus = (apiKey: string) => {
  return {
    lists: {
      getAllContacts: getAllContacts(apiKey),
      createContact: createContact(apiKey),
    },
  };
};
