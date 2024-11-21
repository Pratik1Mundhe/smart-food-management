import { makeAutoObservable } from "mobx";
import dayjs from "dayjs";

import {
  MealFoodDataType,
  MealFoodItemResponseType,
  MealScheduledDataType,
  MealTypeEnum,
} from "../types";
import MealFoodItemModel from "../models/MealFoodItemModel";
import ScheduledMealModel from "../models/ScheduledMealModel";
import { MEAL_DAY_KEY_FORMAT } from "../constants";

class ScheduledMealStore {
  mealDayData: Map<string, MealScheduledDataType> = new Map();
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getMealId(date: string, mealType: MealTypeEnum) {
    const mealData = this.mealDayData.get(date);
    if (mealData) {
      return this.mealDayData.get(date)![mealType]?.mealId;
    }
  }
  getMealItems(date: string, mealType: MealTypeEnum) {
    const mealData = this.mealDayData.get(date);
    if (mealData) {
      return this.mealDayData.get(date)![mealType]?.items;
    }
  }

  getMealDayData(date: string): MealFoodDataType {
    const dateObject = new Date(date);
    const formattedDate = dayjs(dateObject).format(MEAL_DAY_KEY_FORMAT);
    const mealData = this.mealDayData.get(formattedDate);
    if (!mealData) {
      return {
        breakfast: [],
        lunch: [],
        dinner: [],
      };
    }
    const mealDayDataObject = {
      breakfast: mealData.breakfast?.items || [],
      lunch: mealData.lunch?.items || [],
      dinner: mealData.dinner?.items || [],
    };

    return mealDayDataObject;
  }

  setScheduledMeal(
    date: string,
    mealType: MealTypeEnum,
    items: MealFoodItemResponseType[],
    mealId: string
  ): void {
    const dateObject = new Date(date);
    const formattedDate = dayjs(dateObject).format(MEAL_DAY_KEY_FORMAT);
    const itemInstances = items.map((item) => {
      const { id, name, fullMealQuantity, halfMealQuantity } = item;
      return new MealFoodItemModel({
        id,
        name,
        fullMealQuantity,
        halfMealQuantity,
      });
    });
    const mealModel = new ScheduledMealModel(mealId, mealType, itemInstances);

    // Merge with existing data or create new
    let mealDataObject = this.mealDayData.get(formattedDate) || {
      breakfast: null,
      lunch: null,
      dinner: null,
    };

    mealDataObject = {
      ...mealDataObject,
      [mealType]: mealModel,
    };

    this.mealDayData.set(formattedDate, mealDataObject);
  }
}

const scheduledMealStore = new ScheduledMealStore();
export default scheduledMealStore;
