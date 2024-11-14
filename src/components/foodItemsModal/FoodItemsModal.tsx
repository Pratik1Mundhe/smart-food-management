import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import Modal from "../modal/Modal";
import { foodItemType, MealTypeEnum, VoidFunctionType } from "../../types";
import foodStore from "../../store/FoodStore";

interface FoodItemsModal {
  setShowFoodItemsModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentMealTab: MealTypeEnum;
  addFoodItem: (food: foodItemType) => void;
}

const FoodItemsModal: React.FC<FoodItemsModal> = ({
  setShowFoodItemsModal,
  currentMealTab,
  addFoodItem,
}) => {
  const [selectedFoodItem, setSelectedFoodItem] = useState<foodItemType | null>(
    null
  );

  const currentMealType =
    currentMealTab[0].toUpperCase() + currentMealTab.slice(1);

  const handleFoodSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const foodItemId = parseInt(e.target.value);
    const foodObject = foodStore.getFoodItemWithQuantities(foodItemId)!;
    setSelectedFoodItem(foodObject);
  };

  const handleAddFoodItem: VoidFunctionType = () => {
    if (!selectedFoodItem) {
      return;
    }
    addFoodItem(selectedFoodItem);
    setShowFoodItemsModal(false);
  };

  return (
    <Modal close={() => setShowFoodItemsModal(false)}>
      <div className="w-[400px] flex flex-col gap-4">
        <h1 className="text-xl">Add to {currentMealType}</h1>
        <p className="text-secondary text-sm font-medium">
          SELECT THE FOOD ITEM
        </p>

        <div className="relative flex flex-col gap-1">
          <select
            disabled={foodStore.getFood().length === 0}
            onChange={handleFoodSelect}
            className="border-2 text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 outline-none w-full"
          >
            <option value="">Select Food Item</option>
            {foodStore.getFood().map((food) => {
              const { name, id } = food;
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          <div className="pointer-events-none absolute top-4 right-3 flex items-center text-slate-600">
            <FiChevronDown className="w-5 h-5" />
          </div>
        </div>
        <button
          onClick={handleAddFoodItem}
          className="bg-success w-fit self-center text-white font-medium py-2 px-5 rounded-lg mt-4"
        >
          ADD ITEM
        </button>
      </div>
    </Modal>
  );
};

export default FoodItemsModal;
