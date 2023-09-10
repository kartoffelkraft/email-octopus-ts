import { emailOctopus } from "src/emailOctopus";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("createContact", () => {
  const FAKE_API_KEY = "351df8ea-52ec-4c5a-a805-85843a292b05";

  it("should create a contact", async () => {
    const mockedData = {
      id: "3c53c7e0-30da-415a-a671-8e86893bc595",
      email_address: "kevinigeligeligel@gmail.com",
      fields: {},
      tags: [],
      status: "PENDING",
      created_at: "2021-10-10T15: 44: 00.000Z",
    };
    mockedAxios.post.mockImplementation(() =>
      Promise.resolve({
        data: mockedData,
      }),
    );

    const props = {
      listId: "3c53c7e0-30da-415a-a671-8e86893bc595",
      emailAddress: "kevinigeligeligel@gmail.com",
    };

    const result = await emailOctopus(FAKE_API_KEY).lists.createContact(props);
    expect(result).toEqual(mockedData);
  });
});
