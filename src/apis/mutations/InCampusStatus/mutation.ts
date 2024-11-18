import { gql } from "@apollo/client";

export const IN_CAMPUS_STATUS = gql`
  mutation Mutation($params: UpdateIncampusStatusParams!) {
    updateIncampusStatus(params: $params) {
      ... on IncampusStatusUpdateSuccess {
        message
      }
    }
  }
`;
