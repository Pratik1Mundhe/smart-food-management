import { MealPreferenceEnum, MealStatusEnum, MealTypeEnum } from "../types";
import UserMealItemModel from "./UserMealItemModel";

class UserPreferredMealModel {
  mealId: string;
  items: UserMealItemModel[];
  status: null | MealStatusEnum;
  preference: null | MealPreferenceEnum;
  mealType: MealTypeEnum;

  constructor(
    mealId: string,
    items: UserMealItemModel[],
    status: null | MealStatusEnum,
    preference: null | MealPreferenceEnum,
    mealType: MealTypeEnum
  ) {
    this.mealId = mealId;
    this.items = items;
    this.status = status;
    this.preference = preference;
    this.mealType = mealType;
  }

  updateMealPreference(preference: MealPreferenceEnum) {
    this.preference = preference;
  }

  updateMealStatus(status: MealStatusEnum) {
    this.status = status;
  }

  addMealItem(id: string, name: string, quantity: number) {
    this.items.push(new UserMealItemModel(id, name, quantity));
  }

  removeMealItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}

export default UserPreferredMealModel;
