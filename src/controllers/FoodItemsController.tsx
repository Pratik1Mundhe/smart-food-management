import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import FoodItems from "../pages/foodItems/FoodItems";
import CreateFoodItemController from "./CreateFoodItemController";
import foodItemsStore from "../store/FoodItemsStore";
import {
  BaseSizeUnitEnum,
  FoodItemActionEnum,
  FoodItemCategoryEnum,
  FoodItemType,
  ServingSizeUnitEnum,
  VoidFunctionType,
} from "../types";
import FoodItemModel from "../models/FoodItemModel";

const FoodItemsController: React.FC = () => {
  const [updateFoodItemData, setUpdateFoodItemData] =
    useState<FoodItemModel | null>(null);
  const [showCreateFoodItemModal, setShowCreateFoodItemModal] =
    useState<boolean>(false);
  const [showUpdateFoodItemModal, setShowUpdateFoodItemModal] =
    useState<boolean>(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] =
    useState<boolean>(false);
  const [deleteFoodItemId, setDeleteFoodItemId] = useState<string | null>(null);
  const { t } = useTranslation();
  const tPath = "pages.foodItems";

  const handleShowCreateFoodItemModal: VoidFunctionType = () => {
    setShowCreateFoodItemModal(true);
  };
  const handleShowUpdateFoodItemData = (foodItem: FoodItemModel) => {
    setUpdateFoodItemData(foodItem);
    setShowUpdateFoodItemModal(true);
  };
  const handleCloseCreateFoodItemModal: VoidFunctionType = () => {
    setShowCreateFoodItemModal(false);
  };
  const handleCloseUpdateFoodItemModal: VoidFunctionType = () => {
    setShowUpdateFoodItemModal(false);
    setUpdateFoodItemData(null);
  };
  //move into components
  const handleShowDeleteConfirmModal = (id: string) => {
    setShowDeleteConfirmModal(true);
    setDeleteFoodItemId(id);
  };
  const handleCloseDeleteConfirmModal: VoidFunctionType = () => {
    setShowDeleteConfirmModal(false);
  };

  const addFoodItemIntoStore = (foodItem: FoodItemType) => {
    foodItemsStore.addFoodItem(foodItem);
    toast.success(`${foodItem.name} is added`);
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

  const updateFoodItem = (foodItem: FoodItemType) => {
    foodItemsStore.updateFoodItem(foodItem);
    toast.success(`${foodItem.name} is updated`);
  };

  if (showCreateFoodItemModal) {
    return (
      <CreateFoodItemController
        handleCloseFoodItemModal={handleCloseCreateFoodItemModal}
        foodItemAction={addFoodItemIntoStore}
        actionType={FoodItemActionEnum.CREATE}
        initialFoodItemData={{
          id: "",
          name: "",
          category: FoodItemCategoryEnum.EMPTY,
          baseSizeUnit: BaseSizeUnitEnum.EMPTY,
          servingSizeUnit: ServingSizeUnitEnum.EMPTY,
        }}
      />
    );
  }

  if (showUpdateFoodItemModal) {
    if (!updateFoodItemData) {
      throw new Error("Update food item is not selected !");
    }
    return (
      <CreateFoodItemController
        handleCloseFoodItemModal={handleCloseUpdateFoodItemModal}
        foodItemAction={updateFoodItem}
        actionType={FoodItemActionEnum.UPDATE}
        initialFoodItemData={updateFoodItemData}
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
      handleShowUpdateFoodItemData={handleShowUpdateFoodItemData}
    />
  );
};

export default observer(FoodItemsController);
