import { MealTypeEnum } from "./types";

const dummyCustomData = {
  date: "2024-11-25",
  meals: [
    {
      mealId: "1",
      mealType: MealTypeEnum.BREAKFAST,
      items: [
        { id: "1", name: "Pancakes", customMealQuantity: 0 },
        { id: "2", name: "Scrambled Eggs", customMealQuantity: 0 },
        { id: "3", name: "Toast with Butter", customMealQuantity: 0 },
        { id: "4", name: "Fruit Salad", customMealQuantity: 0 },
        { id: "22", name: "Fruit Salad", customMealQuantity: 0 },
      ],
    },
    {
      mealId: "2",
      mealType: MealTypeEnum.LUNCH,
      items: [
        { id: "5", name: "Grilled Chicken", customMealQuantity: 0 },
        { id: "6", name: "Caesar Salad", customMealQuantity: 0 },
        { id: "7", name: "Mashed Potatoes", customMealQuantity: 0 },
        { id: "8", name: "Vegetable Soup", customMealQuantity: 0 },
        { id: "82", name: "Vegetable Soup", customMealQuantity: 0 },
      ],
    },
    {
      mealId: "3",
      mealType: MealTypeEnum.DINNER,
      items: [
        { id: "9", name: "Spaghetti Bolognese", customMealQuantity: 0 },
        { id: "10", name: "Garlic Bread", customMealQuantity: 0 },
        { id: "11", name: "Green Salad", customMealQuantity: 0 },
        { id: "12", name: "Chocolate Pudding", customMealQuantity: 0 },
        { id: "121", name: "Chocolate Pudding", customMealQuantity: 0 },
      ],
    },
  ],
};

export default dummyCustomData;
