import { useQuery } from "@apollo/client";
import { GET_MEAL_PREFERENCE } from "./query";

const useFetchMealPreference = () => {
  const { loading, error } = useQuery(GET_MEAL_PREFERENCE, {
    onCompleted: () => {},
  });
  return { loading, error };
};
export default useFetchMealPreference;
