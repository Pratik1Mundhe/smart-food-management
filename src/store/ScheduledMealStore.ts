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
import { v4 } from "uuid";
import { formatDate } from "../utils/formatDate";

class ScheduledMealStore {
  mealDayData: Map<string, MealScheduledDataType> = new Map();
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getMealDayData(date: Date): MealFoodDataType {
    const formattedDate = dayjs(date).format(MEAL_DAY_KEY_FORMAT);
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
    date: Date,
    mealType: MealTypeEnum,
    items: MealFoodItemResponseType[],
    mealId: string
  ): void {
    const formattedDate = dayjs(date).format(MEAL_DAY_KEY_FORMAT);
    const itemInstances = items.map((item) => {
      const { id, name, fullMealQuantity, halfMealQuantity } = item;
      return new MealFoodItemModel(
        id,
        name,
        fullMealQuantity,
        halfMealQuantity
      );
    });
    const mealModel = new ScheduledMealModel(mealId, mealType, itemInstances);
    const mealDataObject = this.mealDayData.get(formattedDate) || {
      breakfast: null,
      lunch: null,
      dinner: null,
    };

    this.mealDayData.set(formattedDate, {
      ...mealDataObject,
      [mealType]: mealModel,
    });
  }

  addFoodItemIntoMeal(
    date: Date,
    mealType: MealTypeEnum,
    id: string,
    name: string,
    fullMealQuantity: number,
    halfMealQuantity: number
  ) {
    const formattedDate = dayjs(date).format(MEAL_DAY_KEY_FORMAT);
    const mealDay = this.mealDayData.get(formattedDate);
    //if data is not there in database and store
    if (!mealDay) {
      const item = { id, name, fullMealQuantity, halfMealQuantity };
      this.setScheduledMeal(date, mealType, [item], v4());
    } else {
      const meal = mealDay[mealType];
      console.log(meal);
      meal?.addFoodItem(id, name, fullMealQuantity, halfMealQuantity);
    }
  }

  removeFoodItemFromMeal(date: Date, mealType: MealTypeEnum, foodId: string) {
    const formattedDate = dayjs(date).format(MEAL_DAY_KEY_FORMAT);
    const mealDay = this.mealDayData.get(formattedDate);
    if (!mealDay) {
      return;
    }
    const meal = mealDay[mealType];
    meal?.removeFoodItem(foodId);
  }
}

const scheduledMealStore = new ScheduledMealStore();
export default scheduledMealStore;
