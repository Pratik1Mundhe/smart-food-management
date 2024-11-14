import { useQuery } from "@apollo/client";
import { GET_MEAL_STATUS } from "./query";

const useFetchMealStatus = () => {
  const { loading, error } = useQuery(GET_MEAL_STATUS, {
    onCompleted: () => {},
  });
  return { loading, error };
};
export default useFetchMealStatus;
