import { makeAutoObservable } from "mobx";

import FoodItemModel from "../models/FoodItemModel";
import {
  BaseSizeUnitEnum,
  FoodItemCategoryEnum,
  FoodItemsResponseType,
  ServingSizeUnitEnum,
} from "../types";

class FoodItemsStore {
  foodItems: FoodItemModel[] = [
    {
      id: "1",
      name: "Basmati Rice",
      category: FoodItemCategoryEnum.RICE,
      baseSizeUnit: BaseSizeUnitEnum.KG,
      servingSizeUnit: ServingSizeUnitEnum.LADDLE,
    },
    {
      id: "2",
      name: "Blueberry Pancake",
      category: FoodItemCategoryEnum.PANCAKE,
      baseSizeUnit: BaseSizeUnitEnum.PISCES,
      servingSizeUnit: ServingSizeUnitEnum.PISCES,
    },
    {
      id: "3",
      name: "Orange Juice",
      category: FoodItemCategoryEnum.BEVERAGES,
      baseSizeUnit: BaseSizeUnitEnum.KG,
      servingSizeUnit: ServingSizeUnitEnum.GLASS,
    },
    {
      id: "4",
      name: "Cold Coffee",
      category: FoodItemCategoryEnum.BEVERAGES,
      baseSizeUnit: BaseSizeUnitEnum.KG,
      servingSizeUnit: ServingSizeUnitEnum.GLASS,
    },
    {
      id: "5",
      name: "Classic Pancake",
      category: FoodItemCategoryEnum.PANCAKE,
      baseSizeUnit: BaseSizeUnitEnum.PISCES,
      servingSizeUnit: ServingSizeUnitEnum.PISCES,
    },
    {
      id: "6",
      name: "Steamed Rice",
      category: FoodItemCategoryEnum.RICE,
      baseSizeUnit: BaseSizeUnitEnum.KG,
      servingSizeUnit: ServingSizeUnitEnum.LADDLE,
    },
  ];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addFoodItems(items: FoodItemsResponseType[]): void {
    const foodItemInstances = items.map((item) => {
      const { id, name, category, baseSizeUnit, servingSizeUnit } = item;
      return FoodItemModel.createFoodItemModal(
        id,
        name,
        category,
        baseSizeUnit,
        servingSizeUnit
      );
    });
    this.foodItems = foodItemInstances;
  }

  addFoodItem(foodItem: FoodItemsResponseType): void {
    const { id, name, category, baseSizeUnit, servingSizeUnit } = foodItem;
    const foodItemInstance = FoodItemModel.createFoodItemModal(
      id,
      name,
      category,
      baseSizeUnit,
      servingSizeUnit
    );
    this.foodItems.push(foodItemInstance);
  }

  getFoodItem(foodId: string): FoodItemModel | undefined {
    return this.foodItems.find((item) => item.id === foodId);
  }

  removeFoodItem(foodId: string): void {
    this.foodItems = this.foodItems.filter((food) => food.id !== foodId);
  }

  getFoodItems(): FoodItemModel[] {
    return this.foodItems;
  }

  static createFoodItemsStore() {
    return new FoodItemsStore();
  }
}

const foodItemsStore = FoodItemsStore.createFoodItemsStore();
export default foodItemsStore;
