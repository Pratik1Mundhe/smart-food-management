import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { observer } from "mobx-react-lite";

import Modal from "../modal/Modal";
import { foodItemType, MealTypeEnum } from "../../types";
import useFetchFoodItems from "../../apis/queries/getFoodItems/useFetchFoodItems";
import Loader from "../loader/Loader";
import SelectFoodItems from "../selectFoodItems/SelectFoodItems";

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
  const { loading, error } = useFetchFoodItems();
  const [selectedFoodItem, setSelectedFoodItem] = useState<foodItemType | null>(
    null
  );
  const currentMealType =
    currentMealTab[0].toUpperCase() + currentMealTab.slice(1);

  const handleAddFoodItem = (): void => {
    if (!selectedFoodItem) {
      return;
    }
    addFoodItem(selectedFoodItem);
    setShowFoodItemsModal(false);
  };

  const renderFoodItems = () => {
    if (error) {
      return (
        <div>
          <h1>Something went wrong !!!</h1>
        </div>
      );
    }

    if (loading) {
      return (
        <div>
          <Loader color="black" width={30} height={30} />
        </div>
      );
    }

    return (
      <div className="relative flex flex-col gap-1">
        <SelectFoodItems setSelectedFoodItem={setSelectedFoodItem} />
        <div className="pointer-events-none absolute top-4 right-3 flex items-center text-slate-600">
          <FiChevronDown className="w-5 h-5" />
        </div>
      </div>
    );
  };

  return (
    <Modal close={() => setShowFoodItemsModal(false)}>
      <div className="w-[400px] flex flex-col gap-4">
        <h1 className="text-xl">Add to {currentMealType}</h1>
        <p className="text-secondary text-sm font-medium">
          SELECT THE FOOD ITEM
        </p>

        {renderFoodItems()}

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

export default observer(FoodItemsModal);
