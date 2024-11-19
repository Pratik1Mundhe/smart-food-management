import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Modal from "../modal/Modal";
import { FoodItemsModalPropsType, ReactElementType } from "../../types";
import SelectFoodItems from "../selectFoodItems/SelectFoodItems";
import { selectArrowButton, greenButton } from "./styles";
import foodItemsStore from "../../store/FoodItemsStore";
import FoodItemsEmptyView from "./FoodItemsEmptyView";
import FoodItemsLoaderView from "./FoodItemsLoaderView";
import FoodItemsErrorView from "./FoodItemsErrorView";

const FoodItemsModal: React.FC<FoodItemsModalPropsType> = ({
  handleRefetchFoodItems,
  handleAddFoodItem,
  handleCloseModal,
  setSelectedFoodItem,
  refetchloading,
  loading,
  error,
  currentMealTab,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.adminHome.scheduleMeal.foodItemsModal";

  const renderFoodItems: ReactElementType = () => {
    if (error) {
      return (
        <FoodItemsErrorView
          tPath={tPath}
          handleRefetchFoodItems={handleRefetchFoodItems}
        />
      );
    }
    if (loading || refetchloading) {
      return <FoodItemsLoaderView />;
    }

    if (foodItemsStore.getFoodItems().length === 0) {
      return (
        <FoodItemsEmptyView
          tPath={tPath}
          handleRefetchFoodItems={handleRefetchFoodItems}
        />
      );
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

  return (
    <Modal close={handleCloseModal}>
      <div className="w-[400px] flex flex-col gap-4">
        <h1 className="text-xl text-general font-semibold">
          {t(tPath + ".title") + t(tPath + `.mealType.${currentMealTab}`)}
        </h1>
        {renderFoodItems()}
      </div>
    </Modal>
  );
};

export default observer(FoodItemsModal);
