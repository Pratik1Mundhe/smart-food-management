import { useMutation } from "@apollo/client";
import USER_PREFERENCE_MEAL from "./mutation";
import { successToast } from "../../../utils/toastUtils/successToast";
import { failureToast } from "../../../utils/toastUtils/failureToast";
import { MealTypeEnum, VoidFunctionType } from "../../../types";
import ModalStore from "../../../store/ModalStore";
import UserMealStore from "../../../store/UserMealStore";

function useMutateUserPreference(
  action: VoidFunctionType,
  mealPreference: string,
  mealType: MealTypeEnum
) {
  const [userPreference, { loading, error }] = useMutation(
    USER_PREFERENCE_MEAL,
    {
      onCompleted: handelSuccussAdd,
      onError: () => failureToast("Failed to Add Try Again"),
    }
  );

  function triggerUserPreference(data: any) {
    userPreference({ variables: { params: { ...data } } });
  }
  function handelSuccussAdd() {
    successToast("Meal Add Successfully");
    action();
    ModalStore.closeModal();
    UserMealStore.setUserPreference(mealPreference, mealType);
  }
  return { triggerUserPreference, loading, error };
}

export default useMutateUserPreference;
