import { useMutation } from "@apollo/client";
import USER_PREFERENCE_MEAL from "./mutation";
import { successToast } from "../../../utils/toastUtils/successToast";
import { failureToast } from "../../../utils/toastUtils/failureToast";
import { VoidFunctionType } from "../../../types";
import ModalStore from "../../../store/ModalStore";

function useMutateUserPreference(mealType: string, action: VoidFunctionType) {
  const [userPreference, { data, loading, error }] = useMutation(
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
  }
  return { triggerUserPreference, loading, error };
}

export default useMutateUserPreference;
