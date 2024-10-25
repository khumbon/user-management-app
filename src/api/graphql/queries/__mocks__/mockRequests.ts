import { GET_USERS } from "../getUsers";

export const queryMocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [
          {
            id: 1,
            gender: "male",
            firstName: "John",
            lastName: "Doe",
            age: 30,
          },
          {
            id: 2,
            gender: "female",
            firstName: "Jane",
            lastName: "Doe",
            age: 25,
          },
        ],
      },
    },
  },
];
