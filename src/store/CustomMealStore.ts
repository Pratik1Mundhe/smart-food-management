import { makeAutoObservable } from "mobx";

import CustomMealModel, { CustomMealType } from "../models/CustomMealModel";
import CustomMealItemModel from "../models/CustomMealItemModel";

class _CustomMealStore {
  //Remove string type and use null for no date case
  date: Date | null;
  meals: CustomMealModel[];
  constructor() {
    this.date = null;
    this.meals = [];
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setCustomMealData(date: Date, data: CustomMealType[]) {
    this.date = date;
    this.meals = data.map((eachMeal) => new CustomMealModel(eachMeal));
  }
  setMealData(data: CustomMealType[]) {
    this.meals = data.map((eachMeal) => new CustomMealModel(eachMeal));
  }
}

const CustomMealStore = new _CustomMealStore();
export default CustomMealStore;
