import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 } from "uuid";

import {
  foodItemType,
  MealFoodDataType,
  MealTypeEnum,
  ReactElementType,
} from "../../types";
import MealDate from "../mealDate/MealDate";
import MealTabs from "../mealTabs/MealTabs";
import foodStore from "../../store/FoodStore";
import ScheduleFoodItem from "../scheduleFoodItem/ScheduleFoodItem";
import FoodItemsModal from "../foodItemsModal/FoodItemsModal";
import DeleteConfirmModal from "../confirmModal/DeleteConfirmModal";
import SaveConfirmModal from "../confirmModal/SaveConfirmModal";
import ModalStore from "../../store/ModalStore";

const data = [
  { id: 1, name: "Pancakes" },
  { id: 2, name: "Caesar Salad" },
  { id: 3, name: "Spaghetti" },
  { id: 4, name: "Omelette" },
  { id: 5, name: "Burger" },
  { id: 6, name: "Grilled Salmon" },
  { id: 7, name: "French Toast" },
  { id: 8, name: "Chicken Wrap" },
  { id: 9, name: "Steak" },
  { id: 10, name: "Smoothie Bowl" },
];
foodStore.addFoods(data);

const ScheduleMeal: React.FC = observer(() => {
  const [currentMealTab, setCurrentMealTab] = useState(MealTypeEnum.BREAKFAST);
  const [showFoodItemsModal, setShowFoodItemsModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] =
    useState<boolean>(false);

  const [deleteFoodItemId, setDeleteFoodItemId] = useState<number | null>(null);
  const [foodData, setFoodData] = useState<MealFoodDataType>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  const addFoodItem = (food: foodItemType) => {
    const isFoodExist = foodData[currentMealTab].some(
      (item) => item.id === food.id
    );
    if (isFoodExist) {
      return;
    }
    foodData[currentMealTab].push(food);
  };

  const removeFoodItem = (id: number): void => {
    const filteredFoods = foodData[currentMealTab].filter(
      (item) => item.id !== id
    );
    setFoodData({ ...foodData, [currentMealTab]: filteredFoods });
  };

  const handleTabChange = (meal: MealTypeEnum) => {
    setCurrentMealTab(meal);
  };

  const updateFullMealQuantity = (id: number, quantity: number): void => {
    const updatedFoods = foodData[currentMealTab].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          fullMealQuantity: quantity,
        };
      }
      return item;
    });
    setFoodData({ ...foodData, [currentMealTab]: updatedFoods });
  };

  const updateHalfMealQuantity = (id: number, quantity: number): void => {
    const updatedFoods = foodData[currentMealTab].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          halfMealQuantity: quantity,
        };
      }
      return item;
    });
    setFoodData({ ...foodData, [currentMealTab]: updatedFoods });
  };

  const handleOpenDeleteConfirmModal = (foodId: number) => {
    setDeleteFoodItemId(foodId);
    setShowConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const handleCloseDeleteConfirmModal = () => {
    setShowConfirmModal(false);
    setDeleteFoodItemId(null);
    ModalStore.closeConfirmModal();
  };

  const renderMealFoods: ReactElementType = () => {
    if (foodData[currentMealTab].length === 0) {
      return (
        <div className="flex flex-col items-center justify-center  min-h-[300px]">
          <h1 className="text-general font-semibold text-xl">
            Currently there are no food item's
          </h1>
          <button
            onClick={() => setShowFoodItemsModal(true)}
            className="bg-primary text-sm text-white font-medium py-2 px-5 rounded-lg mt-4"
          >
            ADD ITEM
          </button>
        </div>
      );
    }
    return (
      <>
        <ul className="flex items-center gap-4 mt-4 text-primary font-semibold">
          <li className="w-1/4">Items</li>
          <li className="w-[118px]">Full Meal</li>
          <li className="">Half Meal</li>
        </ul>
        <ul className="mt-6 flex flex-col gap-2">
          {foodData[currentMealTab].map((food) => {
            return (
              <ScheduleFoodItem
                key={v4()}
                food={food}
                updateHalfMealQuantity={updateHalfMealQuantity}
                handleOpenConfirmModal={handleOpenDeleteConfirmModal}
                removeFoodItem={removeFoodItem}
                updateFullMealQuantity={updateFullMealQuantity}
              />
            );
          })}
        </ul>
        <button
          onClick={() => setShowFoodItemsModal(true)}
          className="bg-primary self-start text-sm text-white font-medium py-2 px-5 rounded-lg mt-4"
        >
          ADD ITEM
        </button>
      </>
    );
  };

  const renderConfirmModal: ReactElementType = () => {
    if (deleteFoodItemId && showConfirmModal) {
      const getFoodItem = (): foodItemType => {
        return foodData[currentMealTab].find(
          (item) => item.id === deleteFoodItemId
        )!;
      };
      const foodItem = getFoodItem();
      return (
        <DeleteConfirmModal
          removeFoodItem={removeFoodItem}
          handleCloseDeleteConfirmModal={handleCloseDeleteConfirmModal}
          foodItem={foodItem}
        />
      );
    }
    return <></>;
  };

  const handleSaveMealSchedule = () => {
    //set mutation for saving meal schedule
  };

  const handleCloseSaveConfirmModal = () => {
    setShowSaveConfirmModal(false);
    ModalStore.closeConfirmModal();
  };

  const renderSaveConfirmModal = () => {
    if (showSaveConfirmModal) {
      return (
        <SaveConfirmModal
          action={handleSaveMealSchedule}
          closeModal={handleCloseSaveConfirmModal}
        />
      );
    }
  };

  const handleOpenSaveConfirmModal = () => {
    setShowSaveConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center gap-4 self-end">
        <button className="rounded text-sm py-2 px-5 text-general font-semibold border-2">
          Back
        </button>
        <button
          onClick={handleOpenSaveConfirmModal}
          className="bg-success text-sm text-white px-5 py-2 rounded font-semibold"
        >
          Save
        </button>
      </div>
    );
  };

  const renderFoodItemModel = () => {
    if (showFoodItemsModal) {
      return (
        <FoodItemsModal
          addFoodItem={addFoodItem}
          currentMealTab={currentMealTab}
          setShowFoodItemsModal={setShowFoodItemsModal}
        />
      );
    }
  };

  return (
    <div className="flex flex-col border-[1px] rounded-md mt-4 py-10 px-20">
      <h1 className="text-3xl pb-2 text-general border-b-2 w-fit border-b-primary mb-10">
        Schedule Meal
      </h1>
      <div className="flex justify-between items-center">
        <MealTabs
          handleTabChange={handleTabChange}
          currentMealTab={currentMealTab}
        />
        <MealDate />
      </div>
      {renderMealFoods()}
      {renderButtons()}
      {renderFoodItemModel()}
      {renderConfirmModal()}
      {renderSaveConfirmModal()}
    </div>
  );
});

export default ScheduleMeal;
