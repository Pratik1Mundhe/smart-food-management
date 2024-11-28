import { MealTypeEnum } from "./types";

const dummyMealData = [
  {
    date: "2024-11-28",
    mealId: "1",
    mealType: MealTypeEnum.BREAKFAST, // Enum or string
    items: [
      { id: "1", name: "Pancakes", fullMealQuantity: 3, halfMealQuantity: 1 },
      {
        id: "2",
        name: "Scrambled Eggs",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "3",
        name: "Toast with Butter",
        fullMealQuantity: 4,
        halfMealQuantity: 2,
      },
      {
        id: "4",
        name: "Fruit Salad",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
    ],
  },
  {
    date: "2024-11-28",
    mealId: "2",
    mealType: MealTypeEnum.LUNCH, // Enum or string
    items: [
      {
        id: "5",
        name: "Grilled Chicken",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "6",
        name: "Caesar Salad",
        fullMealQuantity: 3,
        halfMealQuantity: 2,
      },
      {
        id: "7",
        name: "Mashed Potatoes",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "8",
        name: "Vegetable Soup",
        fullMealQuantity: 1,
        halfMealQuantity: 1,
      },
    ],
  },
  {
    date: "2024-11-28",
    mealId: "3",
    mealType: MealTypeEnum.DINNER, // Enum or string
    items: [
      {
        id: "9",
        name: "Spaghetti Bolognese",
        fullMealQuantity: 3,
        halfMealQuantity: 1,
      },
      {
        id: "10",
        name: "Garlic Bread",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "11",
        name: "Green Salad",
        fullMealQuantity: 2,
        halfMealQuantity: 1,
      },
      {
        id: "12",
        name: "Chocolate Pudding",
        fullMealQuantity: 1,
        halfMealQuantity: 0,
      },
    ],
  },
];

export default dummyMealData;
