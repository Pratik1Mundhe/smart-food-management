import { useQuery } from "@apollo/client";
import { NetworkStatus } from "@apollo/client";

import { GET_SCHEDULE_MEAL } from "./query";
import { onSuccess } from "./responseHandler";
import calculateCustomIndex from "../../../utils/calculateCustomIndex";
import { useEffect } from "react";
import dummyMealData from "../../../dummyMealData";
import scheduledMealStore from "../../../store/ScheduledMealStore";

const useFetchScheduledMeal = (date: string, mealType: string) => {
  const { loading, error, refetch, networkStatus } = useQuery(
    GET_SCHEDULE_MEAL,
    {
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
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
  const refetchLoading = NetworkStatus.refetch === networkStatus;
  const index = calculateCustomIndex(mealType);
  useEffect(() => {
    if (true) {
      const { date, mealType, items, mealId } = dummyMealData[index];
      scheduledMealStore.setScheduledMeal(date, mealType, items, mealId);
    }
  }, [index]);

  return { mealsLoading: loading, error, refetch, refetchLoading };
};
export default useFetchScheduledMeal;
