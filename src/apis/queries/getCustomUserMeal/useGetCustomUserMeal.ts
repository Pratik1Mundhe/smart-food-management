import { useLazyQuery } from "@apollo/client";
import { NetworkStatus } from "@apollo/client";
import GET_CUSTOM_USER_MEAL from "./query";
import useResponseHandler from "./responseHandler";

const useGetUserCustomMeal = () => {
  const { onSuccess } = useResponseHandler();
  const [
    fetchCustomUserQuantity,
    { data, loading, error, refetch, networkStatus },
  ] = useLazyQuery(GET_CUSTOM_USER_MEAL, {
    fetchPolicy: "network-only",
    onCompleted: onSuccess,
    notifyOnNetworkStatusChange: true,
  });
  const triggerFetchUserCustomMeal = (date: string) => {
    fetchCustomUserQuantity({ variables: { params: { date: date } } });
  };
  const triggerRefetchFunction = (date: string) => {
    refetch({ variables: { params: { date: date } } });
  };
  const refetchLoading = NetworkStatus.refetch === networkStatus;
  return {
    triggerFetchUserCustomMeal,
    triggerRefetchFunction,
    data,
    loading,
    refetchLoading,
    error,
  };
};

export default useGetUserCustomMeal;
