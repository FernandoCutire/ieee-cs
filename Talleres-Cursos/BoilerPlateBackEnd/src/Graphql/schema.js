const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Token {
    token: String
  }

  type User {
    _id: ID
    name: String!
    lastName: String
    age: Int
    email: String!
    createdAt: Date
    updateAt: Date
    password: String!
  }

  input UserInput {
    name: String!
    lastName: String
    age: Int
    email: String!
    password: String!
  }

  type Query {
    getUser(userID: ID): [User]
  }

  type Mutation {
    # CUD USER
    userLogin(email: String!, password: String!): Token
    addUser(userData: UserInput): Token
    updateUser(userID: ID, userData: UserInput): User
    removeUser(userID: ID): User
  }
`;

module.exports = typeDefs;
