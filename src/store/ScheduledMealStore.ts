import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";
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

const exampleMealData = {
  breakfast: {
    mealId: "breakfast-01",
    mealType: MealTypeEnum.BREAKFAST,
    items: [
      {
        id: "breakfast-1",
        name: "Pancakes",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "breakfast-2",
        name: "Scrambled Eggs",
        fullMealQuantity: 3,
        halfMealQuantity: 1.5,
      },
      {
        id: "breakfast-3",
        name: "Bacon Strips",
        fullMealQuantity: 4,
        halfMealQuantity: 2,
      },
      {
        id: "breakfast-4",
        name: "Toast with Butter",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "breakfast-5",
        name: "Fruit Salad",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "breakfast-6",
        name: "Yogurt",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "breakfast-7",
        name: "Oatmeal",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "breakfast-8",
        name: "Coffee",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "breakfast-9",
        name: "Orange Juice",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "breakfast-10",
        name: "Croissant",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "breakfast-11",
        name: "Avocado Toast",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
    ],
  },
  lunch: {
    mealId: "lunch-01",
    mealType: MealTypeEnum.LUNCH,
    items: [
      {
        id: "lunch-1",
        name: "Grilled Chicken",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-2",
        name: "Steamed Vegetables",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-3",
        name: "Rice Pilaf",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-4",
        name: "Caesar Salad",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-5",
        name: "Garlic Bread",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "lunch-6",
        name: "Mashed Potatoes",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-7",
        name: "Soup of the Day",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-8",
        name: "Pasta Alfredo",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-9",
        name: "Roast Beef Sandwich",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-10",
        name: "Lemonade",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "lunch-11",
        name: "Apple Pie",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
    ],
  },
  dinner: {
    mealId: "dinner-01",
    mealType: MealTypeEnum.DINNER,
    items: [
      {
        id: "dinner-1",
        name: "Grilled Salmon",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "dinner-2",
        name: "Roasted Asparagus",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "dinner-3",
        name: "Quinoa Salad",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "dinner-4",
        name: "Baked Potatoes",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "dinner-5",
        name: "Beef Stroganoff",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "dinner-6",
        name: "Vegetable Stir Fry",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "dinner-7",
        name: "Garlic Naan",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "dinner-8",
        name: "Tomato Soup",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "dinner-9",
        name: "Steak",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "dinner-10",
        name: "Chocolate Cake",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
      {
        id: "dinner-11",
        name: "Red Wine",
        fullMealQuantity: 1,
        halfMealQuantity: 0.5,
      },
    ],
  },
};

class ScheduledMealStore {
  mealDayData: Map<string, MealScheduledDataType> = new Map();
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    const breakfast = exampleMealData.breakfast;
    const lunch = exampleMealData.lunch;
    const dinner = exampleMealData.dinner;
    this.setScheduledMeal(
      new Date(),
      MealTypeEnum.BREAKFAST,
      breakfast.items,
      breakfast.mealId
    );
    this.setScheduledMeal(
      new Date(),
      MealTypeEnum.LUNCH,
      lunch.items,
      lunch.mealId
    );
    this.setScheduledMeal(
      new Date(),
      MealTypeEnum.DINNER,
      dinner.items,
      dinner.mealId
    );
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
      return MealFoodItemModel.createMealFoodItemModel(
        id,
        name,
        fullMealQuantity,
        halfMealQuantity
      );
    });
    const mealModel = ScheduledMealModel.createScheduledMealModel(
      mealId,
      mealType,
      itemInstances
    );
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
    const item = { id, name, fullMealQuantity, halfMealQuantity };
    //if data is not there in database and store
    if (!mealDay) {
      this.setScheduledMeal(date, mealType, [item], v4());
    } else {
      const meal = mealDay[mealType];
      //if day data was set but meal type data is not set
      if (!meal) {
        const mealItemModel = MealFoodItemModel.createMealFoodItemModel(
          id,
          name,
          fullMealQuantity,
          halfMealQuantity
        );
        const mealModel = ScheduledMealModel.createScheduledMealModel(
          v4(),
          mealType,
          [mealItemModel]
        );
        this.mealDayData.set(formattedDate, {
          ...mealDay,
          [mealType]: mealModel,
        });
        return;
      }
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

  static createScheduledMealStore() {
    return new ScheduledMealStore();
  }
}

const scheduledMealStore = ScheduledMealStore.createScheduledMealStore();
export default scheduledMealStore;
