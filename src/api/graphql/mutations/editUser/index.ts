import { useMutation } from "@tanstack/react-query";
import { User } from "../../types";
import { client } from "../../client";
import { gql } from "@apollo/client";

const EDIT_USER = gql`
  mutation EditUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $gender: String
    $age: Int
  ) {
    editUser(
      id: $id
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

export const editUserMutation = () => {
  return useMutation({
    mutationFn: async (editUserInput: {
      id: string;
      firstName?: string;
      lastName?: string;
      gender?: string;
      age?: number;
    }) => {
      return await client.mutate<{ editUser: User }>({
        mutation: EDIT_USER,
        variables: editUserInput,
      });
    },
  });
};
