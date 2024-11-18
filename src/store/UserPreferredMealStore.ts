import { makeAutoObservable } from "mobx";
import { MealTypeEnum, UserPreferredMealPlanType } from "../types";
import UserPreferredMealModel from "../models/UserPreferredMealModel";

class _UserPreferredMealStore {
  date: Date | null = null;
  mealPlan: UserPreferredMealPlanType = {
    breakfast: null,
    lunch: null,
    dinner: null,
  };
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setMealPlan(
    mealType: MealTypeEnum,
    userPreferredMeal: UserPreferredMealModel
  ): void {
    this.mealPlan[mealType] = userPreferredMeal;
  }

  getUserPreferredMealPlan(
    mealType: MealTypeEnum
  ): UserPreferredMealModel | null {
    return this.mealPlan[mealType];
  }
}

const userPreferredMealStore = new _UserPreferredMealStore();
export default userPreferredMealStore;
