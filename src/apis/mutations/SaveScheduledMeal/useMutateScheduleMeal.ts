import { useMutation } from "@apollo/client";
import SET_SCHEDULE_MEAL from "./mutation";

function useScheduleMeal() {
  const [setSchedule, { loading, error }] = useMutation(SET_SCHEDULE_MEAL, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  return { setSchedule, loading, error };
}

export default useScheduleMeal;
