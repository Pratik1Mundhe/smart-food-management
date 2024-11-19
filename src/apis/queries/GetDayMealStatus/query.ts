import { DocumentNode, gql } from "@apollo/client";

export const GET_MEAL_STATUS: DocumentNode = gql`
        Query GetMealStatus($mealId:String!){
            getMealStatus(mealId:$mealId){
            mealStatus
            }
        }
`;
