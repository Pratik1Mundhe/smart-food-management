import { makeAutoObservable } from "mobx";

import ScheduledMealModel from "../models/ScheduledMealModel";
import MealFoodItemModel from "../models/MealFoodItemModel";
import {
  MealFoodItemResponseType,
  MealPreferenceEnum,
  MealStatusEnum,
  MealTypeEnum,
} from "../types";

interface MealScheduledDataType {
  breakfast: ScheduledMealModel | null;
  lunch: ScheduledMealModel | null;
  dinner: ScheduledMealModel | null;
}

interface UserMealPreferenceType {
  breakfast: null | MealPreferenceEnum;
  lunch: null | MealPreferenceEnum;
  dinner: null | MealPreferenceEnum;
}

interface UserMealStatusType {
  breakfast: null | MealStatusEnum;
  lunch: null | MealStatusEnum;
  dinner: null | MealStatusEnum;
}

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
      return new MealFoodItemModel(
        id,
        name,
        fullMealQuantity,
        halfMealQuantity
      );
    });
    this.mealData[mealType] = new ScheduledMealModel(
      date,
      mealType,
      itemInstances
    );
  }

  getMealData(mealType: MealTypeEnum) {
    return this.mealData[mealType];
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
