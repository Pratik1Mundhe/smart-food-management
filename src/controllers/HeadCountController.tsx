import React, { useState } from "react";

import HeadCount from "../pages/headCount/HeadCount";
import {
  BaseSizeUnitEnum,
  FoodItemCategoryEnum,
  HeadCountDayMealsDataType,
  MealPreferenceEnum,
  MealTypeEnum,
} from "../types";

const generatedMealDayData: HeadCountDayMealsDataType = {
  breakfast: [
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Pancakes with Syrup",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 3, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Orange Juice",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.HALF,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Rice Porridge",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 0.5, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.CUSTOM,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Banana Smoothie",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.GLASS },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Egg and Cheese Pancake",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 2, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.SKIP,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Steamed Rice with Milk",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Lemon Tea",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.GLASS },
      preference: MealPreferenceEnum.HALF,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Veg Pancake",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 3, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Black Coffee",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.GLASS },
      preference: MealPreferenceEnum.CUSTOM,
    },
    {
      mealType: MealTypeEnum.BREAKFAST,
      name: "Rice Pancakes with Chutney",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 4, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.FULL,
    },
  ],
  lunch: [
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Steamed Rice and Curry",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.HALF,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Lemon Rice",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Paneer Pancake Wrap",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 2, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.SKIP,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Vegetable Fried Rice",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.CUSTOM,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Chicken Pancake Rolls",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 3, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Sweet Rice Pudding",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 0.5, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.HALF,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Mango Smoothie",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.GLASS },
      preference: MealPreferenceEnum.SKIP,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Pineapple Juice",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.GLASS },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Savory Rice Bowl",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.CUSTOM,
    },
    {
      mealType: MealTypeEnum.LUNCH,
      name: "Spinach Pancakes",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 4, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.FULL,
    },
  ],
  dinner: [
    {
      mealType: MealTypeEnum.DINNER,
      name: "Grilled Chicken and Rice",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Plain Rice with Lentil Soup",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.HALF,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Pancakes with Honey",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 3, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.CUSTOM,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Hot Chocolate",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.GLASS },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Biryani with Raita",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.HALF,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Crispy Pancake Bites",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 4, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.SKIP,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Apple Cider",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.GLASS },
      preference: MealPreferenceEnum.FULL,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Rice Pilaf with Nuts",
      category: FoodItemCategoryEnum.RICE,
      quantity: { value: 1, unit: BaseSizeUnitEnum.KG },
      preference: MealPreferenceEnum.CUSTOM,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Veggie Pancake Stacks",
      category: FoodItemCategoryEnum.PANCAKE,
      quantity: { value: 2, unit: BaseSizeUnitEnum.PISCES },
      preference: MealPreferenceEnum.HALF,
    },
    {
      mealType: MealTypeEnum.DINNER,
      name: "Mint Lemonade",
      category: FoodItemCategoryEnum.BEVERAGES,
      quantity: { value: 1, unit: BaseSizeUnitEnum.GLASS },
      preference: MealPreferenceEnum.FULL,
    },
  ],
};
const completedMealHeadCountData = 5;

const HeadCountController: React.FC = () => {
  const [currentMealTab, setCurrentMealTab] = useState<MealTypeEnum>(
    MealTypeEnum.BREAKFAST
  );
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleTabChange = (mealType: MealTypeEnum): void => {
    setCurrentMealTab(mealType);
  };

  const mealData = generatedMealDayData[currentMealTab];
  return (
    <HeadCount
      mealData={mealData}
      currentMealTab={currentMealTab}
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      handleTabChange={handleTabChange}
      completedMealHeadCountData={completedMealHeadCountData}
    />
  );
};

export default HeadCountController;
