import gql from "graphql-tag";

export default gql`
  mutation CreateUser($data: NewUserInput!) {
    createUser(data: $data) {
      email
      nickname
    }
  }
`;