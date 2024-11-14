import { makeAutoObservable } from "mobx";
import MealDetailsModel from "../models/MealDetailsModel";
import { MealDetailsType } from "../types";

class _UserMealStore {
  data: string;
  mealsDetails: MealDetailsModel[];

  constructor() {
    this.data = "Today";
    this.mealsDetails = [];
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setMealDetails(mealData: MealDetailsType[]) {
    this.mealsDetails = mealData.map(
      (eachMeal) => new MealDetailsModel(eachMeal)
    );
  }
  setDate(newDate: string) {
    this.data = newDate;
  }
}

const UserMealStore = new _UserMealStore();
export default UserMealStore;
