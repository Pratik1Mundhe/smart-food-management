import { useMutation } from "@apollo/client";
import SET_SCHEDULE_MEAL from "./mutation";
import { VoidFunctionType } from "../../../types";

const useMutateScheduleMeal = (
  saveMealSuccess: VoidFunctionType,
  saveMealFailure: VoidFunctionType
) => {
  const [setSchedule, { loading, error }] = useMutation(SET_SCHEDULE_MEAL, {
    onCompleted: ({ scheduleMeal }) => {
      if (scheduleMeal.__typename === "ScheduleMealSuccess") {
        saveMealSuccess();
      } else if (scheduleMeal.__typename === "ScheduleMealFailure") {
        saveMealFailure();
      }
    },
  });

  return { setSchedule, loading, error };
};

export default useMutateScheduleMeal;
