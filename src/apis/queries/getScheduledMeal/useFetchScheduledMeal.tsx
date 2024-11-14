import { useQuery } from "@apollo/client";
import { GET_SCHEDULE_MEAL } from "./query";

const useFetchScheduledMeal = (date: string, mealType: string) => {
  const { loading, error } = useQuery(GET_SCHEDULE_MEAL, {
    onCompleted: (data) => {
      console.log(data);
    },
    variables: {
      params: {
        date: date,
        mealType: mealType,
      },
    },
  });

  return { mealsLoading: loading, error };
};
export default useFetchScheduledMeal;
