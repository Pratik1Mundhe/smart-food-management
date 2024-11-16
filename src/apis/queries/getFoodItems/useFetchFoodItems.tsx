import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_FOOD_ITEMS } from "./query";
import { onSuccess } from "./responseHandler";

const useFetchFoodItems = () => {
  const { loading, error, refetch, networkStatus } = useQuery(GET_FOOD_ITEMS, {
    onCompleted: ({ getItems }) => {
      const { items } = getItems;
      onSuccess(items);
    },
    notifyOnNetworkStatusChange: true,
    variables: {
      params: {
        limit: 10,
        offset: 0,
      },
    },
  });

  const refetchloading = NetworkStatus.refetch === networkStatus;

  return { loading, error, refetch, refetchloading };
};
export default useFetchFoodItems;
