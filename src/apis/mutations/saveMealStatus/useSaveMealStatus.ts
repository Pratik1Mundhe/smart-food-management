import { useMutation } from "@apollo/client";
import SAVE_MEAL_STATUS from "./mutation";
import { MealStatusEnum } from "../../../types";
import UserMealStore from "../../../store/UserMealStore";
import ModalStore from "../../../store/ModalStore";
import { VoidFunctionType } from "../../../types";

function useSaveMealStatus(action?: VoidFunctionType) {
  const [saveMealStatus, { data, loading, error }] = useMutation(
    SAVE_MEAL_STATUS,
    { onCompleted: ({ mealStatus }) => handelSuccess(mealStatus) }
  );
  function triggerSaveMealStatue(data: {
    status: MealStatusEnum;
    mealId: string | null | undefined;
  }) {
    saveMealStatus({
      variables: {
        params: { status: data.status.toUpperCase(), mealId: data.mealId },
      },
    });
  }
  if (error) {
    if (action) {
      action();
    }
  }
  function handelSuccess(mealStatus: MealStatusEnum) {
    UserMealStore.setMealStatus(mealStatus, ModalStore.typeOfMeal);
    if (action) {
      action();
    }
  }
  return { triggerSaveMealStatue, loading, error };
}

export default useSaveMealStatus;
