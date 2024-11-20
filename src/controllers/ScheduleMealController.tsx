import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import useScheduleMeal from "../apis/mutations/SaveScheduledMeal/useMutateScheduleMeal";
import scheduledMealStore from "../store/ScheduledMealStore";
import { formatDate, getTomorrowDate } from "../utils/formatDate";
import {
  MealTypeEnum,
  ScheduleMealModalType,
  VoidFunctionType,
} from "../types";
import useFetchScheduledMeal from "../apis/queries/GetMealScheduled/useFetchScheduledMeal";
import { failureToast } from "../utils/toastUtils/failureToast";
import ModalStore from "../store/ModalStore";
import { successToast } from "../utils/toastUtils/successToast";
import ScheduleMeal from "../components/scheduleMeal/ScheduleMeal";
import MealFoodItemModel from "../models/MealFoodItemModel";

const ScheduleMealController: React.FC = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState<Date>(getTomorrowDate());
  const [currentMealTab, setCurrentMealTab] = useState(MealTypeEnum.BREAKFAST);
  const [showModals, setShowModals] = useState<ScheduleMealModalType>({
    showFoodItemsModal: false,
    showDeleteConfirmModal: false,
    showSaveConfirmModal: false,
  });
  const [deleteFoodItemId, setDeleteFoodItemId] = useState<string | null>(null);
  const {
    mealsLoading,
    error: fetchMealsError,
    refetch,
  } = useFetchScheduledMeal(formatDate(currentDate), currentMealTab);

  const saveMealSuccess: VoidFunctionType = () => {
    handleMealSaveSuccess();
  };
  const saveMealFailure: VoidFunctionType = () => {
    handleMealSaveFailure();
  };
  const {
    loading: scheduleMealLoading,
    error: scheduleMealError,
    setSchedule,
  } = useScheduleMeal(saveMealSuccess, saveMealFailure);

  const scheduledMealItems = scheduledMealStore.getMealDayData(currentDate);
  const tPath = "pages.adminHome.scheduleMeal.";

  const addFoodItem = (food: MealFoodItemModel): void => {
    const { id, name, halfMealQuantity, fullMealQuantity } = food;
    scheduledMealStore.addFoodItemIntoMeal(
      currentDate,
      currentMealTab,
      id,
      name,
      halfMealQuantity,
      fullMealQuantity
    );
  };

  const removeFoodItem = (id: string): void => {
    scheduledMealStore.removeFoodItemFromMeal(currentDate, currentMealTab, id);
  };

  const handleRefetchScheduledMeal: VoidFunctionType = () => {
    refetch({
      params: {
        date: formatDate(currentDate),
        mealType: currentMealTab.toUpperCase(),
      },
    });
  };
  const handleTabChange = (meal: MealTypeEnum): void => {
    setCurrentMealTab(meal);
  };
  const handleShowDeleteConfirmModal = (value: boolean): void => {
    setShowModals({ ...showModals, showDeleteConfirmModal: value });
  };
  const handleOpenDeleteConfirmModal = (foodId: string): void => {
    setDeleteFoodItemId(foodId);
    handleShowDeleteConfirmModal(true);
    ModalStore.openConfirmModal();
  };
  const handleCloseDeleteConfirmModal: VoidFunctionType = () => {
    handleShowDeleteConfirmModal(false);
    setDeleteFoodItemId(null);
    ModalStore.closeConfirmModal();
  };
  const handleShowFoodItemsModal = (value: boolean): void => {
    setShowModals({ ...showModals, showFoodItemsModal: value });
  };
  const handleShowSaveConfirmModal = (value: boolean): void => {
    setShowModals({ ...showModals, showSaveConfirmModal: value });
  };
  const handleCloseSaveConfirmModal: VoidFunctionType = () => {
    handleShowSaveConfirmModal(false);
    ModalStore.closeConfirmModal();
  };
  const handleOpenSaveConfirmModal: VoidFunctionType = () => {
    handleShowSaveConfirmModal(true);
    ModalStore.openConfirmModal();
  };
  const handleMealSaveSuccess: VoidFunctionType = () => {
    successToast(t(tPath + "toasts.success"));
  };
  const handleMealSaveFailure: VoidFunctionType = () => {
    failureToast(t(tPath + "toasts.failure"));
    handleCloseSaveConfirmModal();
  };

  const handleSaveMealSchedule: VoidFunctionType = () => {
    handleCloseSaveConfirmModal();
    const itemIds: string[] = [];
    const fullMealQuantities: number[] = [];
    const halfMealQuantities: number[] = [];
    let validation = true;
    scheduledMealItems[currentMealTab].forEach((meal) => {
      const { id, fullMealQuantity, halfMealQuantity } = meal;
      if (fullMealQuantity === 0 || halfMealQuantity === 0) {
        failureToast(t(tPath + "toasts.quantityError"));
        validation = false;
        return;
      }
      itemIds.push(id);
      fullMealQuantities.push(fullMealQuantity);
      halfMealQuantities.push(halfMealQuantity);
    });
    if (validation) {
      setSchedule({
        variables: {
          params: {
            itemIds,
            fullMealQuantities,
            halfMealQuantities,
            date: formatDate(currentDate),
            mealType: currentMealTab.toUpperCase(),
          },
        },
      });
    }
  };

  return (
    <ScheduleMeal
      foodData={scheduledMealItems}
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      currentMealTab={currentMealTab}
      addFoodItem={addFoodItem}
      removeFoodItem={removeFoodItem}
      showModals={showModals}
      mealsLoading={mealsLoading}
      fetchMealsError={fetchMealsError}
      scheduleMealLoading={scheduleMealLoading}
      scheduleMealError={scheduleMealError}
      handleRefetchScheduledMeal={handleRefetchScheduledMeal}
      handleSaveMealSchedule={handleSaveMealSchedule}
      deleteFoodItemId={deleteFoodItemId}
      handleOpenSaveConfirmModal={handleOpenSaveConfirmModal}
      handleShowFoodItemsModal={handleShowFoodItemsModal}
      handleCloseSaveConfirmModal={handleCloseSaveConfirmModal}
      handleCloseDeleteConfirmModal={handleCloseDeleteConfirmModal}
      handleOpenDeleteConfirmModal={handleOpenDeleteConfirmModal}
      handleTabChange={handleTabChange}
    />
  );
};

export default observer(ScheduleMealController);
