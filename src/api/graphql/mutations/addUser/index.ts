import { useMutation } from "@tanstack/react-query";
import { User } from "../../types";
import { client } from "../../client";
import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $gender: String!
    $age: Int!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      age: $age
    ) {
      id
      gender
      firstName
      lastName
      age
    }
  }
`;

export const addUserMutation = () => {
  return useMutation({
    mutationFn: async (userData: Omit<User, "id">) => {
      return await client.mutate<{ addUser: User }>({
        mutation: ADD_USER,
        variables: { ...userData, age: Number(userData.age) },
      });
    },
  });
};
