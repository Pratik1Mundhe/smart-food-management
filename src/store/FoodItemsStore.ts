import { makeAutoObservable } from "mobx";

import FoodItemModal from "../models/FoodItemModel";
import { FoodItemsResponseType } from "../types";

class FoodItemsStore {
  //This value is not valid in this store, can move to appropriate store
  foodItems: FoodItemModal[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addFoodItems(items: FoodItemsResponseType[]): void {
    const foodItemInstances = items.map((item) => {
      const { id, name, category, baseSizeUnit, servingSizeUnit } = item;
      return new FoodItemModal(
        id,
        name,
        category,
        baseSizeUnit,
        servingSizeUnit
      );
    });
    this.foodItems = foodItemInstances;
  }

  getFoodItem(foodId: string): FoodItemModal | undefined {
    return this.foodItems.find((item) => item.id === foodId);
  }

  getFoodItems(): FoodItemModal[] {
    return this.foodItems;
  }
}

const foodItemsStore = new FoodItemsStore();
export default foodItemsStore;
