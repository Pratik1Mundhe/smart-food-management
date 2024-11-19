import { useMutation } from "@apollo/client";
import SET_SCHEDULE_MEAL from "./mutation";

const useMutateScheduleMeal = () => {
  const [setSchedule, { loading, error }] = useMutation(SET_SCHEDULE_MEAL, {
    onCompleted: () => {},
  });

  return { setSchedule, loading, error };
};

export default useMutateScheduleMeal;
