import { makeAutoObservable } from "mobx";

import ScheduledMealModel from "../models/ScheduledMealModel";
import MealFoodItemModel from "../models/MealFoodItemModel";
import {
  MealFoodItemResponseType,
  MealPreferenceEnum,
  MealScheduledDataType,
  MealStatusEnum,
  MealTypeEnum,
  UserMealPreferenceType,
  UserMealStatusType,
} from "../types";

class ScheduledMealStore {
  date: string | null = null;
  mealData: MealScheduledDataType = {
    breakfast: null,
    lunch: null,
    dinner: null,
  };

  userMealPreference: UserMealPreferenceType = {
    breakfast: null,
    lunch: null,
    dinner: null,
  };
  userMealStatus: UserMealStatusType = {
    breakfast: null,
    lunch: null,
    dinner: null,
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setScheduledMeal(
    date: string,
    mealType: MealTypeEnum,
    items: MealFoodItemResponseType[]
  ) {
    const itemInstances = items.map((item) => {
      const { id, name, fullMealQuantity, halfMealQuantity } = item;
      return new MealFoodItemModel({
        id,
        name,
        fullMealQuantity,
        halfMealQuantity,
      });
    });
    this.mealData[mealType] = new ScheduledMealModel(
      date,
      mealType,
      itemInstances
    );

    console.log(this.mealData[mealType]);
  }

  getMealData(mealType: MealTypeEnum, date: string) {
    if (date === this.date) {
      return this.mealData[mealType];
    }
    return null;
  }

  setUserMealPreference(
    mealType: MealTypeEnum,
    mealPreference: MealPreferenceEnum
  ) {
    this.userMealPreference[mealType] = mealPreference;
  }

  getUserMealPreference(mealType: MealTypeEnum) {
    return this.userMealPreference[mealType];
  }

  setUserStatus(mealType: MealTypeEnum, mealStatus: MealStatusEnum) {
    this.userMealStatus[mealType] = mealStatus;
  }

  getUserStatus(mealType: MealTypeEnum) {
    return this.userMealStatus[mealType];
  }
}

const scheduledMealStore = new ScheduledMealStore();
export default scheduledMealStore;
