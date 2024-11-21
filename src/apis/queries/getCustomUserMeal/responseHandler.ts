import CustomMealStore from "../../../store/CustomMealStore";

const useResponseHandler = () => {
  const onSuccess = (data) => {
    if (data.getScheduledMealForUser.meals.length > 0) {
      CustomMealStore.setMealData(data.getScheduledMealForUser.meals);
    }
  };
  return { onSuccess };
};
export default useResponseHandler;
