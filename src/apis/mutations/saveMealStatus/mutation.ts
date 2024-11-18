import { gql } from "@apollo/client";

const SAVE_MEAL_STATUS = gql`
  mutation SaveMealStatus($params: SaveMealStatusParams!) {
    saveMealStatus(params: $params) {
      ... on MealStatus {
        mealStatus
      }
    }
  }
`;
export default SAVE_MEAL_STATUS;
