import { makeAutoObservable } from "mobx";
import { MealStatusEnum, MealTypeEnum } from "../types";

class _UserMealStore {
  data: Date | null;
  mealId: string | null;
  inCampusStatus: boolean;
  mealStatus: {
    breakfast: MealStatusEnum | null;
    lunch: MealStatusEnum | null;
    dinner: MealStatusEnum | null;
  };

  constructor() {
    //use Date type
    this.data = null;
    //Use null type for no value cases
    this.mealId = null;
    //Remove NULL from the enum
    this.inCampusStatus = true;
    this.mealStatus = {
      breakfast: null,
      lunch: null,
      dinner: null,
    };
    makeAutoObservable(this, {}, { autoBind: true });
  }

  //Write a new method for selected meal data storing
  //Can add private access modifier if required
  private setDate(newDate: Date) {
    this.data = newDate;
  }
  private setMealId(newMealId: string) {
    this.mealId = newMealId;
  }
  setMealDetails(newDate: Date, newMealId: string) {
    this.setDate(newDate);
    this.setMealId(newMealId);
  }
  setMealStatus(status: MealStatusEnum, mealType: MealTypeEnum) {
    this.mealStatus = { ...this.mealStatus, [mealType]: status };
  }
  setInCampusStatus(): void {
    this.inCampusStatus = !this.inCampusStatus;
  }
}

const UserMealStore = new _UserMealStore();
export default UserMealStore;
