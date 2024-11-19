import React from "react";
import { observer } from "mobx-react-lite";

import foodItemsStore from "../../store/FoodItemsStore";
import { FoodItemsSelectPropsType } from "../../types";
import { selectInput } from "./styles";
import MealFoodItemModel from "../../models/MealFoodItemModel";

const SelectFoodItems: React.FC<FoodItemsSelectPropsType> = ({
  setSelectedFoodItem,
}) => {
  const handleSelectFoodItem = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { id, name } = foodItemsStore.getFoodItem(e.target.value)!;
    const mealFoodItem = new MealFoodItemModel(id, name, 0, 0);
    setSelectedFoodItem(mealFoodItem);
  };

  return (
    <select
      disabled={foodItemsStore.getFoodItems().length === 0}
      onChange={handleSelectFoodItem}
      className={selectInput}
    >
      <option value="">Select Food Item</option>
      {foodItemsStore.getFoodItems().map((food) => {
        const { id, name } = food;
        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      })}
    </select>
  );
};

export default observer(SelectFoodItems);
