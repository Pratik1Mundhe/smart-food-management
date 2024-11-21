import UserMealStore from "../../../store/UserMealStore";
function useResponseHandler() {
  function onSuccessFunction(): void {
    UserMealStore.setInCampusStatus();
  }
  return { onSuccessFunction };
}
export default useResponseHandler;
