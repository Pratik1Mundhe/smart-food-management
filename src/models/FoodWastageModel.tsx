import { makeAutoObservable } from "mobx";
import FoodWastageItemModel from "./FoodWastageItemModel";

interface FoodWastageModelType {
  totalFoodPrepared: number;
  totalFoodWasted: number;
  items: FoodWastageItemModel[];
}

class FoodWastageModel {
  totalFoodPrepared: number;
  totalFoodWasted: number;
  items: FoodWastageItemModel[];
  constructor(foodWastage: FoodWastageModelType) {
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
