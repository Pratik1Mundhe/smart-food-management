import { useQuery } from "@apollo/client";

import { GET_SCHEDULE_MEAL } from "./query";
import scheduledMealStore from "../../../store/ScheduledMealStore";
import { onSuccess } from "./responseHandler";

//TODO: we can remove mealtype and fetch 3 meals of the day at a time
const useFetchScheduledMeal = (date: string, mealType: string) => {
  const { loading, error, refetch } = useQuery(GET_SCHEDULE_MEAL, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ getScheduledMealByAdmin }) => {
      if (getScheduledMealByAdmin.__typename === "AdminScheduledMeal") {
        const { date, mealId, mealType, items } = getScheduledMealByAdmin;
        scheduledMealStore.setScheduledMeal(date, mealType, items, mealId);
        onSuccess(getScheduledMealByAdmin);
      }
    },
    variables: {
      params: {
        date: date,
        mealType: mealType.toUpperCase(),
      },
    },
  });

  return { mealsLoading: loading, error, refetch };
};
export default useFetchScheduledMeal;
