import { ADD_USER } from "../addUser";
import { DELETE_USER } from "../deleteUser";
import { EDIT_USER } from "../editUser";

export const mutationMocks = [
  {
    request: {
      query: ADD_USER,
      variables: {
        firstName: "Alice",
        lastName: "Smith",
        gender: "female",
        age: 28,
      },
    },
    result: {
      data: {
        addUser: {
          id: 3,
          firstName: "Alice",
          lastName: "Smith",
          gender: "female",
          age: 28,
        },
      },
    },
  },
  {
    request: {
      query: EDIT_USER,
      variables: {
        id: 1,
        firstName: "Johnathan",
        lastName: "Doe",
        gender: "male",
        age: 31,
      },
    },
    result: {
      data: {
        editUser: {
          id: 1,
          firstName: "Johnathan",
          lastName: "Doe",
          gender: "male",
          age: 31,
        },
      },
    },
  },
  {
    request: {
      query: DELETE_USER,
      variables: {
        id: 2,
      },
    },
    result: {
      data: {
        deleteUser: {
          success: true,
        },
      },
    },
  },
];
