import { useMutation } from "@apollo/client";
import SAVE_MEAL_STATUS from "./mutation";
import { MealStatusEnum } from "../../../types";

function useSaveMealStatus() {
  const [saveMealStatus, { data, loading, error }] =
    useMutation(SAVE_MEAL_STATUS);
  function triggerSaveMealStatue(data: { status: MealStatusEnum }) {
    saveMealStatus({ variables: { ...data } });
  }
  return { triggerSaveMealStatue, loading, error };
}

export default useSaveMealStatus;
