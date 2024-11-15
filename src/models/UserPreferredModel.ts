import UserMealItemModel from "./UserMealItemModel";

interface UserPreferredMealType {
  mealId: string;
  items: UserMealItemModel[];
}
class UserPreferredMealModel {
  mealId: string;
  items: UserMealItemModel[];
  constructor(userPreferred: UserPreferredMealType) {
    this.mealId = userPreferred.mealId;
    this.items = userPreferred.items;
  }
}

export default UserPreferredMealModel;
