import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
      description
      createdAt
      deadline
    }
  }
`
