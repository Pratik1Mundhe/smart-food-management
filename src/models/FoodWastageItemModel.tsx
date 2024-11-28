import { makeAutoObservable } from "mobx";
interface FoodWastageItemModelTypes {
  id: string | null;
  name: string | null;
  foodPrepared: number;
  foodWasted: number;
}

class FoodWastageItemModel {
  id: string | null;
  name: string | null;
  foodPrepared: number;
  foodWasted: number;
  constructor(items: FoodWastageItemModelTypes) {
    this.id = items.id;
    this.name = items.name;
    this.foodPrepared = items.foodPrepared;
    this.foodWasted = items.foodWasted;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setItemFoodPrepared(newQuantity: number) {
    this.foodPrepared = newQuantity;
  }
  setItemFoodWasted(newQuantity: number) {
    this.foodWasted = newQuantity;
  }
}
export default FoodWastageItemModel;
