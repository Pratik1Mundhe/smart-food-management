import { gql } from "@apollo/client";

const USER_PREFERENCE_MEAL = gql`
  mutation Mutation($params: AddMealForUserParams!) {
    addMealForUser(params: $params) {
      ... on MealAddSuccess {
        userMealId
      }
      ... on MealAddFailure {
        message
      }
    }
  }
`;
export default USER_PREFERENCE_MEAL;
