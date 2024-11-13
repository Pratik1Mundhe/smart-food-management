import { useQuery } from "@apollo/client";
import { GET_SCHEDULE_MEAL } from "./query";

const useFetchFoodItems = () => {
  const { loading, error } = useQuery(GET_SCHEDULE_MEAL, {
    onCompleted: () => {},
  });

  return { loading, error };
};
export default useFetchFoodItems;
