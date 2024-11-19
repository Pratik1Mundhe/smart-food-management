import { makeAutoObservable } from "mobx";

class MealFoodItemModel {
  id: string;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;
  constructor(
    id: string,
    name: string,
    fullMealQuantity: number,
    halfMealQuantity: number
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.id = id;
    this.name = name;
    this.fullMealQuantity = fullMealQuantity;
    this.halfMealQuantity = halfMealQuantity;
  }

  updateFullMealQuantity(quantity: number): void {
    this.fullMealQuantity = quantity;
  }

  updateHalfMealQuantity(quantity: number): void {
    this.halfMealQuantity = quantity;
  }
}

export default MealFoodItemModel;
