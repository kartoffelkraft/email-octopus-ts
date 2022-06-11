export type ApiWideErrorResponses = {
  code:
    | "INVALID_PARAMETERS"
    | "API_KEY_INVALID"
    | "UNAUTHORISED"
    | "NOT_FOUND"
    | "UNKNOWN";
  message: string;
};

export type Contact = {
  id: string;
  email_address: string;
  fields: Record<string, unknown>;
  tags: Array<string>;
  status: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING";
  created_at: string;
};
