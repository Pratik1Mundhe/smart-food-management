import { makeAutoObservable } from "mobx";
import MealDetailsModel from "../models/MealDetailsModel";
import { MealDetailsType, MealFoodItemType } from "../types";
import MealFoodItemModel from "../models/MealFoodItemModel";

class _UserMealStore {
  userId: string;
  data: string;
  mealsDetails: MealDetailsModel[];
  selectedMealItems: MealFoodItemModel[];

  constructor() {
    this.data = "Today";
    this.mealsDetails = [];
    this.userId = "";
    this.selectedMealItems = [];
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
  setUserId(user: string) {
    this.userId = user;
  }
  setUserSelectedData(userData: MealFoodItemType[]) {
    this.selectedMealItems = userData.map(
      (eachItem) => new MealFoodItemModel(eachItem)
    );
  }
}

const UserMealStore = new _UserMealStore();
export default UserMealStore;
