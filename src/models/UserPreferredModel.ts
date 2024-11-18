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
    this.items = userPreferred.items.map(
      (each) => new UserMealItemModel(each.id, each.name, each.quantity)
    );
  }
}

export default UserPreferredMealModel;
