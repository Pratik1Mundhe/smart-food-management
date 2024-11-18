import { makeAutoObservable } from "mobx";

import CustomMealModel, { CustomMealType } from "../models/CustomMealModel";

class _CustomMealStore {
  date: string;
  meals: CustomMealModel[];
  constructor() {
    this.date = "";
    this.meals = [];
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setCustomMealData(date: string, data: CustomMealType[]) {
    this.date = date;
    this.meals = data.map((eachMeal) => new CustomMealModel(eachMeal));
  }
}

const CustomMealStore = new _CustomMealStore();
export default CustomMealStore;
