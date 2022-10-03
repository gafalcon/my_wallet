import { gql } from "apollo-server-micro"

export const typeDefs = gql`
type User {
  id: ID
  email: String!
  total_amount: Float!
}

type Tag {
  id: ID
  value: String!
}

type Bank {
  id: ID
  name: String!
}

type Account {
  id: ID
  name: String!
  total_amount: Float!
  bank: Bank!
  user: User!
}

type Transaction {
  id: ID
  description: String
  amount: Float!
  account: Account!
  user: User!
  tags: [Tag!]!
}


type Query {
  getBanks: [Bank]!
  getBank(name: String!): Bank
}

`
