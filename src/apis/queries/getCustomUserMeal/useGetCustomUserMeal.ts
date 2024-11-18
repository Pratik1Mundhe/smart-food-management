import { useLazyQuery } from "@apollo/client";
import GET_CUSTOM_USER_MEAL from "./query";
import { useEffect } from "react";
import CustomMealStore from "../../../store/CustomMealStore";
import dummyCustomData from "../../../dummyCustomData";

const useGetCustomUserMeal = () => {
  const [fetchCustomUserQuantity, { data, loading, error }] =
    useLazyQuery(GET_CUSTOM_USER_MEAL);
  useEffect(() => {
    if (data) {
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      CustomMealStore.setCustomMealData(
        dummyCustomData.date,
        dummyCustomData.meals
      );
    }
  }, [error]);
  const triggerFetchCustomUser = (date: string) => {
    fetchCustomUserQuantity({ variables: { date: "2024-11-18 17:12:57" } });
  };
  return { triggerFetchCustomUser, loading, error };
};

export default useGetCustomUserMeal;
