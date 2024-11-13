import { useQuery } from "@apollo/client";
import { GET_DAY_MEALS } from "./query";

const useFetchFoodItems = () => {
  const { loading, error } = useQuery(GET_DAY_MEALS, {
    onCompleted: () => {},
  });

  return { loading, error };
};
export default useFetchFoodItems;
