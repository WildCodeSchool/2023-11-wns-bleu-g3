import gql from "graphql-tag";

export default gql`
  query Users {
    profile {
      id
      email
      nickname
      avatarUrl
      role
      firstName
      lastName
    }
  }
`;
