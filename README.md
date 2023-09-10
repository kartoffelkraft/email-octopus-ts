# email-octopus-ts

email-octopus-ts is an unofficial TypeScript library for sending emails with the [Email Octopus](https://emailoctopus.com/?urli=J86C8) API. The API also supports many other features like managing lists and contacts.

- Fully typed, works out of the box with TypeScript
- Automatic pagination
- Improved error handling

## Who uses email-octopus-ts?

- [tooltipr](https://www.tooltipr.com/) - Demystify your corporate jargon. tooltipr helps you and your colleagues to actually understand acronyms.
- [hackathon.camp](https://www.hackathon.camp/) - Organize your hackathons the easy way. We help you organize and manage your hackathons to save up to 90% of the time you would spend on organizing.

## Installation

The package is published on [npm](https://www.npmjs.com/package/email-octopus-ts) as `email-octopus-ts`. You will have to install axios because this package depends on it.

<details open>
  <summary>Using yarn</summary>

```bash
yarn add axios email-octopus-ts
```

</details>

<details>
  <summary>Using npm</summary>

```bash
npm install axios email-octopus-ts
```

</details>

## Usage

First, we need to initialize the client with the constructor:

```ts
import { emailOctopus } from "email-octopus-ts";

// TODO: Replace the API key.
const emailOctopusApiKey = "...";
const EmailOctopus = emailOctopus(emailOctopusApiKey);
```

After that we can call the API methods:

<details open>
  <summary>EmailOctopus.lists.createContact</summary>

```ts
import { emailOctopus } from "email-octopus-ts";

// TODO: Replace the API key.
const emailOctopusApiKey = "...";
const EmailOctopus = emailOctopus(emailOctopusApiKey);

const contact = await EmailOctopus.lists.createContact({
  listId: "...",
  emailAddress: "hello@hackathon.camp",
  // fields?: Record<string, unknown>;
  // tags?: Array<string>;
  // status?: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING";
});

// Contact is of type:
// ---
// id: string;
// email_address: string;
// fields: Record<string, unknown>;
// tags: Array<string>;
// status: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING";
// created_at: string;
console.log({ contact });
```

</details>

<details>
  <summary>EmailOctopus.lists.getAllContacts</summary>

```ts
import { emailOctopus } from "email-octopus-ts";

// TODO: Replace the API key.
const emailOctopusApiKey = "...";
const EmailOctopus = emailOctopus(emailOctopusApiKey);

const contacts = await EmailOctopus.lists.getAllContacts(
  {
    listId: "...",
    // limit?: number;
    // page?: number;
  },
  {
    // Will loop through all pages
    autoPaginate: true,
  },
);

contacts.forEach((contact) => {
  // Contact is of type:
  // ---
  // id: string;
  // email_address: string;
  // fields: Record<string, unknown>;
  // tags: Array<string>;
  // status: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING";
  // created_at: string;
  console.log({ contact });
});
```

</details>

## Why Email Octopus?

Email Octopus is a service that helps you manage your email lists. It is a powerful tool that can be used to manage your email lists, send emails, and track your email opens.

I am a indie hacker and I am using Email Octopus for several side projects because it is:

- cheap
- reliable
- support is always there

## Why this library?

- First library with TypeScript support
- Improved error handling
- Automatic pagination so you don't have to implement it yourself

## Licence

[MIT](./LICENSE)

<!-- Trigger Release -->
