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
  const [deleteFoodItemId, setDeleteFoodItemId] = useState<string | null>(null);
  const { t } = useTranslation();
  const tPath = "pages.foodItems";

  const addFoodItemIntoStore = (foodItem: FoodItemType) => {
    foodItemsStore.addFoodItem(foodItem);
    toast.success(`${foodItem.name} is added`);
  };

  const handleDeleteFoodItem: VoidFunctionType = () => {
    if (!deleteFoodItemId) {
      toast.error(t(tPath + ".toasts.error.delete"));
      throw new Error(t(tPath + ".error.notSelected"));
    }
    foodItemsStore.removeFoodItem(deleteFoodItemId);
    toast.success(t(tPath + ".toasts.success.delete"));
  };

  const updateFoodItem = (foodItem: FoodItemType) => {
    foodItemsStore.updateFoodItem(foodItem);
    toast.success(`${foodItem.name} is updated`);
  };

  if (showCreateFoodItemModal) {
    return (
      <CreateFoodItemController
        toggleModal={setShowCreateFoodItemModal}
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
        toggleModal={setShowUpdateFoodItemModal}
        foodItemAction={updateFoodItem}
        actionType={FoodItemActionEnum.UPDATE}
        initialFoodItemData={updateFoodItemData}
      />
    );
  }

  return (
    <FoodItems
      foodItems={foodItemsStore.getFoodItems()}
      setShowCreateFoodItemModal={setShowCreateFoodItemModal}
      handleDeleteFoodItem={handleDeleteFoodItem}
      setShowUpdateFoodItemModal={setShowUpdateFoodItemModal}
      setDeleteFoodItemId={setDeleteFoodItemId}
      setUpdateFoodItemData={setUpdateFoodItemData}
    />
  );
};

export default observer(FoodItemsController);
