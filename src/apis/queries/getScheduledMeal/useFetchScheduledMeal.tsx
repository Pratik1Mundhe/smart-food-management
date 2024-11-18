import { useQuery } from "@apollo/client";

import { GET_SCHEDULE_MEAL } from "./query";
import scheduledMealStore from "../../../store/ScheduledMealStore";
import dummyMealData from "../../../dummyMealData";
import { useEffect } from "react";
import { onSuccess } from "./responseHandler";

const useFetchScheduledMeal = (date: string, mealType: string) => {
  const { loading, error, refetch } = useQuery(GET_SCHEDULE_MEAL, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ getScheduledMealByAdmin }) => {
      const { date, mealId, mealType, items } = getScheduledMealByAdmin;
      scheduledMealStore.setScheduledMeal(date, mealType, items, mealId);
      onSuccess(getScheduledMealByAdmin);
    },
    variables: {
      params: {
        date: date,
        mealType: mealType.toUpperCase(),
      },
    },
  });
  let index;
  if (mealType === "BREAKFAST") {
    index = 0;
  } else if (mealType === "LUNCH") {
    index = 1;
  } else {
    index = 2;
  }

  useEffect(() => {
    if (error !== undefined) {
      const { date, mealType, mealId, items } = dummyMealData[index];
      scheduledMealStore.setScheduledMeal(date, mealType, mealId, items);
    }
  }, [error]);
  return { mealsLoading: loading, error, refetch };
};
export default useFetchScheduledMeal;
