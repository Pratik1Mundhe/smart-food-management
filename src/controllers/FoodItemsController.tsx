import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import FoodItems from "../pages/foodItems/FoodItems";
import CreateFoodItemController from "./CreateFoodItemController";
import foodItemsStore from "../store/FoodItemsStore";
import { FoodItemsResponseType, VoidFunctionType } from "../types";

const FoodItemsController: React.FC = () => {
  const [showCreateFoodItemModal, setShowCreateFoodItemModal] =
    useState<boolean>(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] =
    useState<boolean>(false);
  const [deleteFoodItemId, setDeleteFoodItemId] = useState<string | null>(null);
  const { t } = useTranslation();
  const tPath = "pages.foodItems";

  const handleShowCreateFoodItemModal: VoidFunctionType = () => {
    setShowCreateFoodItemModal(true);
  };

  const handleCloseCreateFoodItemModal: VoidFunctionType = () => {
    setShowCreateFoodItemModal(false);
  }; //move into components

  const handleShowDeleteConfirmModal = (id: string) => {
    setShowDeleteConfirmModal(true);
    setDeleteFoodItemId(id);
  };
  const handleCloseDeleteConfirmModal: VoidFunctionType = () => {
    setShowDeleteConfirmModal(false);
  };

  const addFoodItemIntoStore = (foodItem: FoodItemsResponseType) => {
    foodItemsStore.addFoodItem(foodItem);
  };

  const handleDeleteFoodItem: VoidFunctionType = () => {
    if (!deleteFoodItemId) {
      toast.error(t(tPath + ".toasts.error.delete"));
      throw new Error(t(tPath + ".error.notSelected"));
    }
    //mutation for deleting a food item
    foodItemsStore.removeFoodItem(deleteFoodItemId);
    toast.success(t(tPath + ".toasts.success.delete"));
    handleCloseDeleteConfirmModal();
  };

  if (showCreateFoodItemModal) {
    return (
      <CreateFoodItemController
        handleCloseCreateFoodItemModal={handleCloseCreateFoodItemModal}
        addFoodItemIntoStore={addFoodItemIntoStore}
      />
    );
  }

  return (
    <FoodItems
      foodItems={foodItemsStore.getFoodItems()}
      handleShowCreateFoodItemModal={handleShowCreateFoodItemModal}
      showDeleteConfirmModal={showDeleteConfirmModal}
      handleShowDeleteConfirmModal={handleShowDeleteConfirmModal}
      handleCloseDeleteConfirmModal={handleCloseDeleteConfirmModal}
      handleDeleteFoodItem={handleDeleteFoodItem}
    />
  );
};

export default observer(FoodItemsController);
