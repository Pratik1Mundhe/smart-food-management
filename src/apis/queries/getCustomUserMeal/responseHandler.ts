import { CustomMealType } from "../../../models/CustomMealModel";
import CustomMealStore from "../../../store/CustomMealStore";

interface DataType {
  getScheduledMealForUser: {
    meals: CustomMealType[];
  };
}

const useResponseHandler = () => {
  const onSuccess = (data: DataType) => {
    if (data.getScheduledMealForUser.meals.length > 0) {
      CustomMealStore.setMealData(data.getScheduledMealForUser.meals);
    }
  };
  return { onSuccess };
};
export default useResponseHandler;
