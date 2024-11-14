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

  addFoodItems(items: FoodItemsResponseType[]) {
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

  getFoodItem(foodId: string) {
    return this.foodItems.find((item) => item.id === foodId);
  }

  getFoodItems() {
    return this.foodItems;
  }
  setInCampusStatus() {
    this.inCampusStatus = !this.inCampusStatus;
  }
}

const foodItemsStore = new FoodItemsStore();
export default foodItemsStore;
