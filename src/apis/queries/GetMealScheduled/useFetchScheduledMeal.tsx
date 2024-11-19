import { useQuery, NetworkStatus } from "@apollo/client";

import { GET_SCHEDULE_MEAL } from "./query";
import scheduledMealStore from "../../../store/ScheduledMealStore";
import { onSuccess } from "./responseHandler";
import { MealTypeEnum } from "../../../types";

//TODO: we can remove mealtype and fetch 3 meals of the day at a time
const useFetchScheduledMeal = (date: string, mealType: MealTypeEnum) => {
  const hasMealItems =
    scheduledMealStore.getMealDayData(date)![mealType].length > 0;
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
