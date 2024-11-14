import { useQuery } from "@apollo/client";
import { GET_FOOD_ITEMS } from "./query";
import { onSuccess } from "./responseHandler";

const useFetchFoodItems = () => {
  const { loading, error } = useQuery(GET_FOOD_ITEMS, {
    onCompleted: ({ getItems }) => {
      const { items } = getItems;
      onSuccess(items);
    },
    variables: {
      params: {
        limit: 10,
        offset: 0,
      },
    },
  });

  return { loading, error };
};
export default useFetchFoodItems;
