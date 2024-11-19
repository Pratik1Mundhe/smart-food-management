import React from "react";
import { observer } from "mobx-react-lite";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";

import { ReactElementType, ScheduleMealPropsType } from "../../types";
import Loader from "../loader/Loader";
import MealDate from "../mealDate/MealDate";
import MealTabs from "../mealTabs/MealTabs";
import ScheduleFoodItem from "../scheduleFoodItem/ScheduleFoodItem";
import DeleteConfirmModal from "../confirmModal/DeleteConfirmModal";
import SaveConfirmModal from "../confirmModal/SaveConfirmModal";
import { blueButton, greenButton, header } from "./styles";
import ScheduledMealsLoader from "./ScheduledMealsLoader";
import ScheduledMealSaveErrorView from "./ScheduledMealSaveErrorView";
import ScheduledMealsEmptyView from "./ScheduledMealsEmptyView";
import ScheduledMealsErrorView from "./ScheduledMealsErrorView";
import FoodItemsModalController from "../../controllers/FoodItemsModalController";
import MealFoodItemModel from "../../models/MealFoodItemModel";

const ScheduleMeal: React.FC<ScheduleMealPropsType> = ({
  foodData,
  currentDate,
  currentMealTab,
  setCurrentDate,
  addFoodItem,
  removeFoodItem,
  showModals,
  mealsLoading,
  fetchMealsError,
  scheduleMealLoading,
  scheduleMealError,
  handleRefetchScheduledMeal,
  handleSaveMealSchedule,
  deleteFoodItemId,
  handleOpenSaveConfirmModal,
  handleShowFoodItemsModal,
  handleCloseDeleteConfirmModal,
  handleCloseSaveConfirmModal,
  handleOpenDeleteConfirmModal,
  handleTabChange,
}) => {
  const { t } = useTranslation();

  const tPath = "pages.adminHome.scheduleMeal.";

  const renderMealItemsHeaders: ReactElementType = () => {
    const path = tPath + "mealItemsHeaders.";
    return (
      <ul className="flex items-center gap-4 mt-4 text-primary font-semibold">
        <li className="w-1/4">{t(path + "items")}</li>
        <li className="w-[118px]">{t(path + "fullMeal")}</li>
        <li className="">{t(path + "halfMeal")}</li>
      </ul>
    );
  };

  const renderScheduleFoodItems: ReactElementType = () => {
    return (
      <>
        {renderMealItemsHeaders()}
        <ul className="mt-6 flex flex-col gap-2">
          {foodData[currentMealTab].map((food) => {
            return (
              <ScheduleFoodItem
                key={v4()}
                food={food}
                handleOpenConfirmModal={handleOpenDeleteConfirmModal}
                removeFoodItem={removeFoodItem}
              />
            );
          })}
        </ul>
        <button
          onClick={() => handleShowFoodItemsModal(true)}
          className={blueButton}
        >
          {t(tPath + "buttons.addItem")}
        </button>
      </>
    );
  };
  const renderMealItems: ReactElementType = () => {
    if (fetchMealsError) {
      return (
        <ScheduledMealsErrorView
          tPath={tPath}
          handleRefetchScheduledMeal={handleRefetchScheduledMeal}
        />
      );
    }
    if (scheduleMealError) {
      return (
        <ScheduledMealSaveErrorView
          handleSaveMealSchedule={handleSaveMealSchedule}
          tPath={tPath}
        />
      );
    }
    if (mealsLoading) {
      return <ScheduledMealsLoader />;
    }
    if (foodData[currentMealTab].length === 0) {
      return (
        <ScheduledMealsEmptyView
          tPath={tPath}
          handleShowFoodItemsModal={handleShowFoodItemsModal}
        />
      );
    }
    return renderScheduleFoodItems();
  };

  const renderButtons: ReactElementType = () => {
    const renderButtonLoader = (): JSX.Element | string => {
      if (scheduleMealLoading) {
        return <Loader />;
      }
      return t(tPath + "buttons.save");
    };
    return (
      <div className="flex items-center gap-4 self-end">
        <button className="rounded text-sm py-2 px-5 text-general font-semibold border-2">
          {t(tPath + "buttons.back")}
        </button>
        <button onClick={handleOpenSaveConfirmModal} className={greenButton}>
          {renderButtonLoader()}
        </button>
      </div>
    );
  };
  const renderMealTabsAndDate: ReactElementType = () => {
    return (
      <div className="flex justify-between items-center">
        <MealTabs
          handleTabChange={handleTabChange}
          currentMealTab={currentMealTab}
        />
        <MealDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
    );
  };
  const renderModal = () => {
    if (showModals.showFoodItemsModal) {
      return (
        <FoodItemsModalController
          addFoodItem={addFoodItem}
          currentMealTab={currentMealTab}
          handleShowFoodItemsModal={handleShowFoodItemsModal}
        />
      );
    }
    if (showModals.showDeleteConfirmModal) {
      if (!deleteFoodItemId) {
        throw new Error("Meal item is not selected!");
      }
      const getFoodItem = (): MealFoodItemModel => {
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
          currentDate={currentDate}
          currentMealTab={currentMealTab}
        />
      );
    }
    if (showModals.showSaveConfirmModal) {
      return (
        <SaveConfirmModal
          action={handleSaveMealSchedule}
          closeModal={handleCloseSaveConfirmModal}
        />
      );
    }
    return <></>;
  };

  return (
    <div className="flex flex-col border-[1px] rounded-md mt-4 py-10 px-20">
      <h1 className={header}>{t(tPath + "header")}</h1>
      {renderMealTabsAndDate()}
      {renderMealItems()}
      {renderButtons()}
      {renderModal()}
    </div>
  );
};

export default observer(ScheduleMeal);
