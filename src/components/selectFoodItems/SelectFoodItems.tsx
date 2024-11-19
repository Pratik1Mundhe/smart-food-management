import React from "react";
import { observer } from "mobx-react-lite";

import foodItemsStore from "../../store/FoodItemsStore";
import { FoodItemsSelectPropsType } from "../../types";
import { selectInput } from "./styles";
import { useTranslation } from "react-i18next";

const SelectFoodItems: React.FC<FoodItemsSelectPropsType> = ({
  setSelectedFoodItem,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.adminHome.scheduleMeal.foodItemsModal";
  const handleSelectFoodItem = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
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
      className={selectInput}
    >
      <option value="">{t(tPath + ".selectOption")}</option>
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
