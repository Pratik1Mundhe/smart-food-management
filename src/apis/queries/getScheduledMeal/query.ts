import { DocumentNode, gql } from "@apollo/client";

export const GET_SCHEDULE_MEAL: DocumentNode = gql`
  query Query($params: GetScheduledMealByAdminParams!) {
    getScheduledMealByAdmin(params: $params) {
      ... on AdminScheduledMeal {
        date
        mealType
        items {
          id
          name
          fullMealQuantity
          halfMealQuantity
        }
      }
      ... on MealNotScheduled {
        message
      }
    }
  }
`;
