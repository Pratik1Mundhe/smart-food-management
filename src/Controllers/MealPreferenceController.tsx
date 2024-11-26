import { useState } from "react";
import { MealPreferenceEnum, MealStatusEnum, VoidFunctionType } from "../types";
import ModalStore from "../store/ModalStore";
import MealPreferenceModal from "../components/MealPreferenceModal/MealPreferenceModal";
import { Modals } from "../types";
import scheduledMealStore from "../store/ScheduledMealStore";
import { observer } from "mobx-react";
import useMutateUserPreference from "../apis/mutations/userPreferenceMeal/useMutateUserPreferenceMeal";
import formatQuantityData from "../utils/formatQuantityData";
import dayjs from "dayjs";
import { MEAL_DAY_KEY_FORMAT } from "../constants";
import useSaveMealStatus from "../apis/mutations/saveMealStatus/useSaveMealStatus";

interface MealPreferenceControllerType {
  date: string;
}

const MealPreferenceController: React.FC<MealPreferenceControllerType> = ({
  date,
}) => {
  const type = ModalStore.typeOfMeal;
  const mealItems = scheduledMealStore.getMealDayData(date)[type];
  const mealId = scheduledMealStore.getMealId(
    dayjs(date).format(MEAL_DAY_KEY_FORMAT),
    type
  );

  const [activeTab, setActiveTab] = useState(MealPreferenceEnum.FULL);
  const [showSaveConfirmModal, setShowSaveConfirmModal] =
    useState<boolean>(false);
  const [showCloseConfirmModal, setShowBackConfirmModal] =
    useState<boolean>(false);
  const [showSkipConfirmModal, setShowSkipConfirmModal] =
    useState<boolean>(false);

  function handleActiveTab(activeType: MealPreferenceEnum): void {
    setActiveTab(activeType);
  }
  const handleOpenSkipConfirmModal: VoidFunctionType = () => {
    setShowSkipConfirmModal(true);
    ModalStore.openConfirmModal();
  };
  const handleMealPreferenceSave: VoidFunctionType = () => {
    setShowSaveConfirmModal(false);
  };
  const handleClickBack: VoidFunctionType = () => {
    setShowBackConfirmModal(true);
    ModalStore.openConfirmModal();
  };
  const handleClickSave: VoidFunctionType = () => {
    setShowSaveConfirmModal(true);
    ModalStore.openConfirmModal();
  };
  const handleCloseMealPreferenceModal: VoidFunctionType = () => {
    ModalStore.closeConfirmModal();
    setShowBackConfirmModal(false);
    ModalStore.closeModal();
  };
  const handleCloseConfirmModal: VoidFunctionType = () => {
    ModalStore.closeConfirmModal();
    setShowBackConfirmModal(false);
  };
  const handleSkipMealPreference: VoidFunctionType = () => {
    setShowSkipConfirmModal(false);
  };
  const handleCloseSkipConfirmModal: VoidFunctionType = () => {
    setShowSkipConfirmModal(false);
    ModalStore.closeConfirmModal();
  };

  // Trigger UserPreference Meal Status Api
  const { triggerUserPreference, loading: saveMealPreferenceLoading } =
    useMutateUserPreference(handleMealPreferenceSave, activeTab, type);
  const variables = {
    date: date,
    mealId: mealId,
    mealItems: formatQuantityData(mealItems, activeTab, type),
    mealPreference: activeTab.toUpperCase(),
    mealStatus: "NULL",
    mealType: type.toUpperCase(),
  };
  const handleTriggerUserPreference = () => {
    triggerUserPreference(variables);
  };

  // Trigger skipMeal Api
  const { triggerSaveMealStatue, loading: saveStatusLoading } =
    useSaveMealStatus(handleSkipMealPreference);
  function handelSkipStatus() {
    triggerSaveMealStatue({
      mealId: mealId,
      status: MealStatusEnum.SKIP,
    });
  }

  const modalAction: Modals = {
    save: {
      isModalOpen: showSaveConfirmModal,
      handleAction: handleClickSave,
      handleMealPreference: handleMealPreferenceSave,
    },
    skip: {
      isModalOpen: showSkipConfirmModal,
      handleAction: handleCloseSkipConfirmModal,
      handleModal: handleOpenSkipConfirmModal,
      handleMealPreference: handleSkipMealPreference,
    },
    close: {
      isModalOpen: showCloseConfirmModal,
      handleAction: handleClickBack,
      handleModal: handleCloseConfirmModal,
      handleMealPreference: handleCloseMealPreferenceModal,
    },
  };

  return (
    <>
      <MealPreferenceModal
        mealType={type}
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        setShowSaveConfirmModal={setShowSaveConfirmModal}
        mealItems={mealItems}
        actions={modalAction}
        handleTriggerUserPreference={handleTriggerUserPreference}
        saveMealPreferenceLoading={saveMealPreferenceLoading}
        handelSkipStatus={handelSkipStatus}
        saveStatusLoading={saveStatusLoading}
        isOpen={ModalStore.isModalOpen}
      />
    </>
  );
};

export default observer(MealPreferenceController);
