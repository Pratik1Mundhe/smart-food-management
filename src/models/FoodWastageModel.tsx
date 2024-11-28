import { makeAutoObservable } from "mobx";
import FoodWastageItemModel from "./FoodWastageItemModel";
import { FoodItemsType } from "../types";

class FoodWastageModel {
  totalFoodPrepared: number;
  totalFoodWasted: number;
  items: FoodWastageItemModel[];
  constructor(foodWastage: FoodItemsType) {
    this.totalFoodPrepared = foodWastage.totalFoodPrepared;
    this.totalFoodWasted = foodWastage.totalFoodWasted;
    this.items = foodWastage.items.map(
      (eachItem) => new FoodWastageItemModel(eachItem)
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setTotalFoodPrepared(newQuantity: number) {
    this.totalFoodPrepared = newQuantity;
  }
  setTotalFoodWasted(newQuantity: number) {
    this.totalFoodWasted = newQuantity;
  }
}

export default FoodWastageModel;
