import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import useFetchFoodItems from "../apis/queries/GetMealFoodItems/useFetchFoodItems";
import FoodItemsModal from "../components/foodItemsModal/FoodItemsModal";
import MealFoodItemModel from "../models/MealFoodItemModel";
import { FoodItemsModalControllerPropsType, VoidFunctionType } from "../types";
import { FOOD_ITEMS_LIMIT, FOOD_ITEMS_OFFSET } from "../constants";

const FoodItemsModalController: React.FC<FoodItemsModalControllerPropsType> = ({
  handleShowFoodItemsModal,
  currentMealTab,
  addFoodItem,
}) => {
  const { loading, error, refetch, refetchloading } = useFetchFoodItems();
  const [selectedFoodItem, setSelectedFoodItem] =
    useState<MealFoodItemModel | null>(null);
  const { t } = useTranslation();
  const tPath = "pages.adminHome.scheduleMeal.foodItemsModal";

  const handleAddFoodItem: VoidFunctionType = () => {
    if (!selectedFoodItem) {
      toast.error(t(tPath + ".errors.itemNotSelected"));
      throw new Error(t(tPath + ".errors.itemNotSelected"));
    }
    addFoodItem(selectedFoodItem);
    handleShowFoodItemsModal(false);
  };

  const handleCloseModal: VoidFunctionType = () => {
    handleShowFoodItemsModal(false);
  };

  const handleRefetchFoodItems: VoidFunctionType = () => {
    refetch({
      params: {
        limit: FOOD_ITEMS_LIMIT,
        offset: FOOD_ITEMS_OFFSET,
      },
    });
  };

  return (
    <FoodItemsModal
      handleRefetchFoodItems={handleRefetchFoodItems}
      handleCloseModal={handleCloseModal}
      handleAddFoodItem={handleAddFoodItem}
      setSelectedFoodItem={setSelectedFoodItem}
      refetchloading={refetchloading}
      loading={loading}
      error={error}
      currentMealTab={currentMealTab}
    />
  );
};

export default FoodItemsModalController;
