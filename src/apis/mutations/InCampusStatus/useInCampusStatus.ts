import { useMutation } from "@apollo/client";
import { IN_CAMPUS_STATUS } from "./mutation";
import useResponseHandler from "./responseHandler";

function useInCampusStatus() {
  const { onSuccessFunction } = useResponseHandler();
  const [setInCampusStatus, { loading }] = useMutation(IN_CAMPUS_STATUS, {
    onCompleted: onSuccessFunction,
  });
  function triggerCampusStatus(data: { inCampus: boolean }) {
    setInCampusStatus({ variables: { params: { ...data } } });
  }

  return { triggerCampusStatus, loading };
}

export default useInCampusStatus;
