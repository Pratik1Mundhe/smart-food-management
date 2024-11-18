import { makeAutoObservable } from "mobx";

class CustomMealItemModel {
  id: string;
  name: string;
  customMealQuantity: number;
  constructor(id: string, name: string, customMealQuantity: number) {
    this.id = id;
    this.name = name;
    this.customMealQuantity = customMealQuantity;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  increaseCustomMeal() {
    this.customMealQuantity = this.customMealQuantity + 1;
  }
  decreaseCustomMeal() {
    this.customMealQuantity = this.customMealQuantity - 1;
  }
}
export default CustomMealItemModel;
