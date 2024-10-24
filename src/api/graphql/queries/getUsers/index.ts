import { useQuery } from "@tanstack/react-query";
import { User } from "../../types";
import { client } from "../../client";
import { gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      gender
      firstName
      lastName
      age
    }
  }
`;

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await client.query<{ users: User[] }>({
        query: GET_USERS,
      });
    },
  });
};
