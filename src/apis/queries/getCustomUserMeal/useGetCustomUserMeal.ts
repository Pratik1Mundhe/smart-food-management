import { useLazyQuery } from "@apollo/client";
import GET_CUSTOM_USER_MEAL from "./query";
import useResponseHandler from "./responseHandler";

const useGetCustomUserMeal = () => {
  const { onSuccess } = useResponseHandler();
  const [fetchCustomUserQuantity, { data, loading, error }] = useLazyQuery(
    GET_CUSTOM_USER_MEAL,
    { fetchPolicy: "network-only", onCompleted: onSuccess }
  );
  const triggerFetchCustomUser = (date: string) => {
    fetchCustomUserQuantity({ variables: { params: { date: date } } });
  };
  return { triggerFetchCustomUser, data, loading, error };
};

export default useGetCustomUserMeal;
