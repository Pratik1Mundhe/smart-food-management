import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Modal from "../modal/Modal";
import {
  FoodItemType,
  FoodItemsModalPropsType,
  ReactElementType,
} from "../../types";
import useFetchFoodItems from "../../apis/queries/GetMealFoodItems/useFetchFoodItems";
import Loader from "../loader/Loader";
import SelectFoodItems from "../selectFoodItems/SelectFoodItems";
import { blueButton, selectArrowButton, greenButton } from "./styles";
import foodItemsStore from "../../store/FoodItemsStore";
import { FOOD_ITEMS_LIMIT, FOOD_ITEMS_OFFSET } from "../../constants";
import toast from "react-hot-toast";

const FoodItemsModal: React.FC<FoodItemsModalPropsType> = ({
  setShowFoodItemsModal,
  currentMealTab,
  addFoodItem,
}) => {
  const { loading, error, refetch, refetchloading } = useFetchFoodItems();
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItemType | null>(
    null
  );
  const { t } = useTranslation();
  const tPath = "pages.adminHome.scheduleMeal.foodItemsModal";

  const handleAddFoodItem = (): void => {
    if (!selectedFoodItem) {
      toast.error(t(tPath + ".errors.itemNotSelected"));
      throw new Error(t(tPath + ".errors.itemNotSelected"));
    }
    addFoodItem(selectedFoodItem);
    setShowFoodItemsModal(false);
  };

  const handleRefetchFoodItems = (): void => {
    refetch({
      params: {
        limit: FOOD_ITEMS_LIMIT,
        offset: FOOD_ITEMS_OFFSET,
      },
    });
  };

  const renderErrorView: ReactElementType = () => {
    return (
      <div className="mt-6">
        <h1>{t(tPath + ".errorView.title")}</h1>
        <button onClick={handleRefetchFoodItems} className={blueButton}>
          {t(tPath + ".buttons.retry")}
        </button>
      </div>
    );
  };

  const renderLoaderView: ReactElementType = () => {
    return (
      <div className="mt-6">
        <Loader color="#0B69FF" width={30} height={30} />
      </div>
    );
  };

  const renderEmptyView: ReactElementType = () => {
    return (
      <div className={"flex flex-col items-start"}>
        <h1 className="text-general text-lg">
          {t(tPath + ".emptyView.title")}
        </h1>
        <button onClick={handleRefetchFoodItems} className={blueButton}>
          {t(tPath + ".buttons.retry")}
        </button>
      </div>
    );
  };

  const renderFoodItems: ReactElementType = () => {
    if (error) {
      return renderErrorView();
    }
    if (loading || refetchloading) {
      return renderLoaderView();
    }
    if (foodItemsStore.getFoodItems().length === 0) {
      return renderEmptyView();
    }
    return (
      <>
        <p className="text-secondary text-sm font-medium">
          {t(tPath + ".selectOption")}
        </p>
        <div className="relative flex flex-col gap-1">
          <SelectFoodItems setSelectedFoodItem={setSelectedFoodItem} />
          <button className={selectArrowButton}>
            <FiChevronDown className="w-5 h-5" />
          </button>
        </div>
        <button onClick={handleAddFoodItem} className={greenButton}>
          {t(tPath + ".buttons.addItem")}
        </button>
      </>
    );
  };

  const handleCloseModal = (): void => {
    setShowFoodItemsModal(false);
  };

  return (
    <Modal close={handleCloseModal}>
      <div className="w-[400px] flex flex-col gap-4">
        <h1 className="text-xl text-general font-semibold">
          {t(tPath + `.mealType.${currentMealTab}`) + t(tPath + ".title")}
        </h1>
        {renderFoodItems()}
      </div>
    </Modal>
  );
};

export default observer(FoodItemsModal);
