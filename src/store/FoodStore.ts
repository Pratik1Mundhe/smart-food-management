import { makeAutoObservable } from "mobx";
import FoodModel from "../models/FoodModel";
import { FoodItemResponseType, foodItemType } from "../types";

class FoodStore {
  food: FoodModel[] = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addFood(id: number, name: string): void {
    this.food.push(new FoodModel(id, name));
  }

  addFoods(food: FoodItemResponseType[]): void {
    food.forEach((item) => {
      const { id, name } = item;
      this.food.push(new FoodModel(id, name));
    });
  }

  getFoodItemWithQuantities(id: number): foodItemType | null {
    let foodItem: foodItemType | null = null;
    this.food.forEach((item) => {
      if (item.id === id) {
        foodItem = {
          ...item,
          fullMealQuantity: 0,
          halfMealQuantity: 0,
        };
      }
    })!;
    return foodItem;
  }

  getFood() {
    const foodItems = this.food.map((item) => ({
      ...item,
      fullMealQuantity: 0,
      halfMealQuantity: 0,
    }));
    return foodItems;
  }
}

const foodStore = new FoodStore();
export default foodStore;
