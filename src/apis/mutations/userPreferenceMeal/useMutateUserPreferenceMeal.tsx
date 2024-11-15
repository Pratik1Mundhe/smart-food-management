import { useMutation } from "@apollo/client";
import USER_PREFERENCE_MEAL from "./mutation";

function useMutateUserPreference() {
  const [userPreference, { data, loading, error }] =
    useMutation(USER_PREFERENCE_MEAL);

  function triggerUserPreference() {
    userPreference;
  }
  return { triggerUserPreference, loading, error };
}

export default useMutateUserPreference;
