import { gql } from "@apollo/client";

const GET_CUSTOM_USER_MEAL = gql`
  query GetScheduledMealForUser($params: GetScheduledMealForUserParams!) {
    getScheduledMealForUser(params: $params) {
      ... on UserScheduledMeal {
        date
        meals {
          mealId
          mealType
          items {
            id
            name
            customMealQuantity
          }
        }
      }
    }
  }
`;
export default GET_CUSTOM_USER_MEAL;
