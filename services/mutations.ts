import { gql } from '@apollo/client'

export const LoginGQL = gql`
  mutation Mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstname
        lastname
        email
        tel
        roles
      }
    }
  }
`
