import React from "react";

import foodItemsStore from "../../store/FoodItemsStore";
import { FoodItemType } from "../../types";
import { observer } from "mobx-react-lite";

interface FoodItemOptionPropsType {
  setSelectedFoodItem: React.Dispatch<
    React.SetStateAction<FoodItemType | null>
  >;
}

const SelectFoodItems: React.FC<FoodItemOptionPropsType> = ({
  setSelectedFoodItem,
}) => {
  const handleSelectFoodItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, name } = foodItemsStore.getFoodItem(e.target.value)!;
    setSelectedFoodItem({
      id,
      name,
      fullMealQuantity: 0,
      halfMealQuantity: 0,
    });
  };

  return (
    <select
      disabled={foodItemsStore.getFoodItems().length === 0}
      onChange={handleSelectFoodItem}
      className="border-2 text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 outline-none w-full"
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
