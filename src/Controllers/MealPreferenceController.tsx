import { useState } from "react";
import { MealPreferenceEnum, VoidFunctionType } from "../types";
import ModalStore from "../store/ModalStore";
import MealPreferenceModal from "../components/MealPreferenceModal/MealPreferenceModal";
import { Modals } from "../types";

const MealPreferenceController: React.FC = () => {
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
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        setShowSaveConfirmModal={setShowSaveConfirmModal}
        action={modalAction}
      />
    </>
  );
};

export default MealPreferenceController;
