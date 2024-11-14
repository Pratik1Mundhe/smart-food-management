import { useQuery } from "@apollo/client";

import { GET_SCHEDULE_MEAL } from "./query";
import scheduledMealStore from "../../../store/ScheduledMealStore";

const useFetchScheduledMeal = (date: string, mealType: string) => {
  const { loading, error, data } = useQuery(GET_SCHEDULE_MEAL, {
    onCompleted: (data) => {
      const { date, mealType, items } = data;
      scheduledMealStore.setScheduledMeal(date, mealType, items);
    },

    variables: {
      params: {
        date: date,
        mealType: mealType,
      },
    },
  });

  return { mealsLoading: loading, error, data };
};
export default useFetchScheduledMeal;
