import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_FOOD_ITEMS } from "./query";
import { onSuccess } from "./responseHandler";
import foodItemsStore from "../../../store/FoodItemsStore";

const useFetchFoodItems = () => {
  const hasFoodItems = foodItemsStore.foodItems.length > 0;
  const { loading, error, refetch, networkStatus } = useQuery(GET_FOOD_ITEMS, {
    fetchPolicy: "cache-and-network",
    skip: hasFoodItems,
    notifyOnNetworkStatusChange: true,
    variables: {
      params: {
        limit: 10,
        offset: 0,
      },
    },
    onCompleted: ({ getItems }) => {
      if (getItems.__typename === "ItemsNotFound") {
        return;
      }
      const { items } = getItems;
      onSuccess(items);
    },
  });

  const refetchloading = NetworkStatus.refetch === networkStatus;

  return { loading, error, refetch, refetchloading };
};
export default useFetchFoodItems;
