import { gql } from "@apollo/client";

const GET_CUSTOM_USER_MEAL = gql`
  query Query($params: GetScheduledMealForUserParams!) {
    getScheduledMealForUser(params: $params) {
      ... on UserScheduledMeal {
        date
        meals {
          mealType
          mealId
          mealPreference
          items {
            id
            name
            customMealQuantity
          }
        }
      }
      ... on MealNotScheduled {
        message
      }
    }
  }
`;
export default GET_CUSTOM_USER_MEAL;
