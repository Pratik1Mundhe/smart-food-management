import { makeAutoObservable } from "mobx";
import { MealFoodItemType } from "../types";

class MealFoodItemModel {
  id: string;
  name: string;
  constructor(mealItem: MealFoodItemType) {
    this.id = mealItem.id;
    this.name = mealItem.name;
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default MealFoodItemModel;
