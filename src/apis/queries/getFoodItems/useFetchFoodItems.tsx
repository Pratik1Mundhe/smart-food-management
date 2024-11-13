import { useQuery } from "@apollo/client";
import { GET_FOOD_ITEMS } from "./query";

const useFetchFoodItems = () => {
  const { loading, error } = useQuery(GET_FOOD_ITEMS, {
    onCompleted: () => {},
  });

  return { loading, error };
};
export default useFetchFoodItems;
