import { gql } from "@apollo/client";

const USER_PREFERENCE_MEAL = gql`
        mutation UserPreferenceMeal(){
            addMealForUsers(){
                mealId
                mealPreference 
                mealType
            }
        }
`;
export default USER_PREFERENCE_MEAL;
