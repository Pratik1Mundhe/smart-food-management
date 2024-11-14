import { useQuery } from "@apollo/client";
import { GET_SCHEDULE_MEAL } from "./query";

const useFetchScheduledMeal = () => {
  const { loading, error } = useQuery(GET_SCHEDULE_MEAL, {
    onCompleted: (data) => {
      console.log(data);
    },
    variables: {
      params: {
        date: "2024-11-16 17:48:15",
        mealType: "BREAKFAST",
      },
    },
  });

  return { mealsLoading: loading, error };
};
export default useFetchScheduledMeal;
