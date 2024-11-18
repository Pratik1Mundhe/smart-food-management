import { useQuery } from "@apollo/client";

import { GET_SCHEDULE_MEAL } from "./query";
import { onSuccess } from "./responseHandler";

const useFetchScheduledMeal = (date: string, mealType: string) => {
  const { loading, error, refetch } = useQuery(GET_SCHEDULE_MEAL, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ getScheduledMealByAdmin }) => {
      onSuccess(getScheduledMealByAdmin);
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
