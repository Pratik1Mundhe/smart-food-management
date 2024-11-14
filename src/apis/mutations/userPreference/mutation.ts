import { gql } from "@apollo/client";

const MUTATE_USER_PREFERENCE = gql`
  mutation UserMealPreference($params: userMealData) {
    addMealForUser(params: $params) {
      mealId
      mealPreference
      mealType
    }
  }
`;
export default MUTATE_USER_PREFERENCE;
