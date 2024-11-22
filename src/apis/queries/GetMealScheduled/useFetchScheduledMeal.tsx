import { useQuery, NetworkStatus } from "@apollo/client";

import { GET_SCHEDULE_MEAL } from "./query";
import scheduledMealStore from "../../../store/ScheduledMealStore";
import { onSuccess } from "./responseHandler";
import { MealTypeEnum, UseFetchScheduledMealType } from "../../../types";

const useFetchScheduledMeal: UseFetchScheduledMealType = (
  date: string,
  mealType: MealTypeEnum
) => {
  let hasMealItems = false;
  const mealDay = scheduledMealStore.getMealDayData(new Date(date));

  if (mealDay) {
    hasMealItems = mealDay[mealType]?.length > 0;
  }

  const { loading, error, refetch, networkStatus } = useQuery(
    GET_SCHEDULE_MEAL,
    {
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      skip: hasMealItems,
      onCompleted: ({ getScheduledMealByAdmin }) => {
        if (getScheduledMealByAdmin.__typename === "AdminScheduledMeal") {
          onSuccess(getScheduledMealByAdmin);
        }
      },
      variables: {
        params: {
          date: date,
          mealType: mealType.toUpperCase(),
        },
      },
    }
  );
  const mealsLoading = loading || NetworkStatus.refetch === networkStatus;
  return { mealsLoading, error, refetch };
};
export default useFetchScheduledMeal;
