import { useState } from "react";
import { MealPreferenceEnum, VoidFunctionType } from "../types";
import ModalStore from "../store/ModalStore";
import MealPreferenceModal from "../components/MealPreferenceModal/MealPreferenceModal";
import { Modals } from "../types";
import scheduledMealStore from "../store/ScheduledMealStore";
import { formatDate } from "../utils/formatDate";
import UserMealStore from "../store/UserMealStore";
import { observer } from "mobx-react";
import useMutateUserPreference from "../apis/mutations/userPreferenceMeal/useMutateUserPreferenceMeal";
import formatQuantityData from "../utils/formatQuantityData";
import dayjs from "dayjs";
import { MEAL_DAY_KEY_FORMAT } from "../constants";

interface MealPreferenceControllerType {
  date: string;
}

const MealPreferenceController: React.FC<MealPreferenceControllerType> = ({
  date,
}) => {
  const type = ModalStore.typeOfMeal;
  const mealItems = scheduledMealStore.getMealDayData(
    formatDate(UserMealStore.data!)
  )[type];
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
    //mutation for saving user meal preference
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
    // req will be send to change status as meal is skipped
    setShowSkipConfirmModal(false);
  };

  const handleCloseSkipConfirmModal: VoidFunctionType = () => {
    setShowSkipConfirmModal(false);
    ModalStore.closeConfirmModal();
  };
  const { triggerUserPreference, loading } = useMutateUserPreference(
    ModalStore.typeOfMeal!,
    handleMealPreferenceSave
  );
  const variables = {
    date: date,
    mealId: scheduledMealStore.getMealId(
      dayjs(date).format(MEAL_DAY_KEY_FORMAT),
      type
    ),
    mealItems: formatQuantityData(mealItems, activeTab, type),
    mealPreference: activeTab.toUpperCase(),
    mealStatus: "NULL",
    mealType: type.toUpperCase(),
  };
  const handleTriggerUserPreference = () => {
    triggerUserPreference(variables);
    UserMealStore.setUserPreference(activeTab, type);
  };
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
        saveMealPreferenceLoading={loading}
      />
    </>
  );
};

export default observer(MealPreferenceController);
