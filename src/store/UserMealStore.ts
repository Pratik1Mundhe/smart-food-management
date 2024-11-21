import { makeAutoObservable } from "mobx";
import { MealPreferenceEnum, MealStatusEnum, MealTypeEnum } from "../types";

class _UserMealStore {
  data: Date | null;
  mealId: string | null;
  inCampusStatus: boolean;
  mealStatus: {
    breakfast: MealStatusEnum | null;
    lunch: MealStatusEnum | null;
    dinner: MealStatusEnum | null;
  };
  mealPreference: {
    breakfast: MealPreferenceEnum | null;
    lunch: MealPreferenceEnum | null;
    dinner: MealPreferenceEnum | null;
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
    this.mealPreference = {
      breakfast: null,
      lunch: null,
      dinner: null,
    };
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setDate(newDate: string): void {
    this.data = new Date(newDate);
  }
  private setMealId(newMealId: string) {
    this.mealId = newMealId;
  }
  setMealDetails(newDate: string, newMealId: string) {
    this.setDate(newDate);
    this.setMealId(newMealId);
  }
  setMealStatus(status: MealStatusEnum, mealType: MealTypeEnum) {
    this.mealStatus = { ...this.mealStatus, [mealType]: status };
  }
  setInCampusStatus(): void {
    this.inCampusStatus = !this.inCampusStatus;
  }
  setUserPreference(MealPreference: string, mealType: MealTypeEnum) {
    this.mealPreference = {
      ...this.mealPreference,
      [mealType]: MealPreference,
    };
  }
}

const UserMealStore = new _UserMealStore();
export default UserMealStore;
