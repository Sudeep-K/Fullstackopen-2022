import { gql } from "@apollo/client";

export const FIND_PERSON = gql`
  query FindPerson($name: String!) {
    findPerson(name: $name) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

export const CREATE_PERSON = gql`
  mutation Mutation($name: String!, $street: String!, $city: String!, $phone: String) {
      addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
          city
          street
      }
      }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`