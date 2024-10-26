import { gql } from "@apollo/client";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../client";

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
    }
  }
`;

export const deleteUserMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await client.mutate<{ deleteUser: { success: boolean } }>({
        mutation: DELETE_USER,
        variables: { id },
      });
    },
  });
};
