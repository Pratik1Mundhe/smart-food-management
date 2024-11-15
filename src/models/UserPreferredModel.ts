import UserMealItemModel from "./UserMealItemModel";

interface UserPreferredType {
  mealId: string;
  items: UserMealItemModel[];
}
class UserPreferredModel {
  mealId: string;
  items: UserMealItemModel[];
  constructor(userPreferred: UserPreferredType) {
    this.mealId = userPreferred.mealId;
    this.items = userPreferred.items;
  }
}

export default UserPreferredModel;
