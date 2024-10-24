const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const REST_API_URL = 'http://localhost:5000/users';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    gender: String!
    age: Int!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type DeleteUserResponse {
  success: Boolean!
}

  type Mutation {
    addUser(firstName: String!, lastName: String!, gender: String!, age: Int!): User
    editUser(id: ID!, firstName: String, lastName: String, gender: String, age: Int): User
    deleteUser(id: ID!): DeleteUserResponse!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const response = await axios.get(REST_API_URL);
      return response.data;
    },
    user: async (_, { id }) => {
      const response = await axios.get(`${REST_API_URL}/${id}`);
      return response.data;
    }
  },
  Mutation: {
    addUser: async (_, { firstName, lastName, gender, age }) => {
      const response = await axios.post(REST_API_URL, {
        firstName,
        lastName,
        gender,
        age
      });
      return response.data;
    },
    editUser: async (_, { id, firstName, lastName, gender, age }) => {
      const response = await axios.put(`${REST_API_URL}/${id}`, {
        firstName,
        lastName,
        gender,
        age
      });
      return response.data;
    },
    deleteUser: async (_, { id }) => {
      const response = await axios.delete(`${REST_API_URL}/${id}`);
      return { success: response.status === 200 };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});
