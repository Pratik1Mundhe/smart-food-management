import { useMutation } from "@apollo/client";
import SET_USER_PREFERENCE from "./mutation";

function useSetUserPreference() {
  const [mutateUserPreference, { data, loading, error }] =
    useMutation(SET_USER_PREFERENCE);

  function triggerMutateUserPreference() {
    mutateUserPreference();
  }

  return { triggerMutateUserPreference, loading, error };
}
export default useSetUserPreference;
