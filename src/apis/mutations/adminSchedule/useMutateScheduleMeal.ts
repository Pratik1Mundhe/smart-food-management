import { useMutation } from "@apollo/client";
import SET_SCHEDULE_MEAL from "./mutation";

function useScheduleMeal() {
  const [setSchedule, { data, loading, error }] =
    useMutation(SET_SCHEDULE_MEAL);
  function triggerScheduleMeal() {
    setSchedule();
  }
  return { triggerScheduleMeal, loading, error };
}

export default useScheduleMeal;
