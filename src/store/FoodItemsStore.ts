import { makeAutoObservable } from "mobx";

import FoodItemModal from "../models/FoodItemModel";
import { FoodItemsResponseType } from "../types";

class FoodItemsStore {
  inCampusStatus: boolean;
  foodItems: FoodItemModal[] = [];

  constructor() {
    this.inCampusStatus = true;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addFoodItems(items: FoodItemsResponseType[]): void {
    const foodItemInstances = items.map((item) => {
      const { id, name, category, baseSizeUnit, servingSizeUnit } = item;
      return FoodItemModal.createFoodItemModal(
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
  setInCampusStatus(): void {
    this.inCampusStatus = !this.inCampusStatus;
  }

  static createFoodItemsStore() {
    return new FoodItemsStore();
  }
}

const foodItemsStore = FoodItemsStore.createFoodItemsStore();
export default foodItemsStore;
