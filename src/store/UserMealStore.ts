import { makeAutoObservable } from "mobx";
import { MealStatusEnum, MealTypeEnum } from "../types";

class _UserMealStore {
  data: string;
  mealId: string;
  mealStatus: {
    breakfast: MealStatusEnum;
    lunch: MealStatusEnum;
    dinner: MealStatusEnum;
  };

  constructor() {
    this.data = "Today";
    this.mealId = "";
    this.mealStatus = {
      breakfast: MealStatusEnum.NULL,
      lunch: MealStatusEnum.NULL,
      dinner: MealStatusEnum.NULL,
    };
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setDate(newDate: string): void {
    this.data = newDate;
  }
  setMealId(newMealId: string) {
    this.mealId = newMealId;
  }
  setMealStatus(status: MealStatusEnum, mealType: MealTypeEnum) {
    this.mealStatus = { ...this.mealStatus, [mealType]: status };
  }
}

const UserMealStore = new _UserMealStore();
export default UserMealStore;
