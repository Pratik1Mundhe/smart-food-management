import { UserMealItemModelType } from "../types";

class UserMealItemModel {
  id: string;
  name: string;
  quantity: number;
  constructor(mealItems: UserMealItemModelType) {
    this.id = mealItems.id;
    this.name = mealItems.name;
    this.quantity = mealItems.quantity;
  }
}
export default UserMealItemModel;
