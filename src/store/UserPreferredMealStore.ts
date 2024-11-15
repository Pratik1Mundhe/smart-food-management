import { makeAutoObservable } from "mobx";
import UserPreferredModel from "../models/UserPreferredmodel";

class _UserPreferredMealStore {
  date: string;
  breakfastMealPlan: UserPreferredModel[];
  lunchMealPlan: UserPreferredModel[];
  dinnerMealPlan: UserPreferredModel[];

  constructor() {
    this.date = "Today";
    this.breakfastMealPlan = [];
    this.lunchMealPlan = [];
    this.dinnerMealPlan = [];
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

const UserPreferredMealStore = new _UserPreferredMealStore();
export default UserPreferredMealStore;
