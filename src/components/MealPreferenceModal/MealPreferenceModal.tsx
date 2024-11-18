import { useState } from "react";
import Modal from "../commonComponents/Modal";
import { observer } from "mobx-react";

import MealTypesTab from "../commonComponents/MealTypesTab";
import scheduledMealStore from "../../store/ScheduledMealStore";
import CustomMealStore from "../../store/CustomMealStore";
import selectedMealTypeData from "../../utils/selectedMealTypeData";
import UserMealStore from "../../store/UserMealStore";
import ModalStore from "../../store/ModalStore";
import { FOOD_URL } from "../../constants";
import SaveConfirmModal from "../confirmModal/SaveConfirmModal";
import CloseConfirmModal from "../confirmModal/CloseConfirmModal";
import SkipConfirmModal from "../confirmModal/SkipConfirmModal";
import Meals from "./Meals";
import {
  backButton,
  buttonContainer,
  headerContainer,
  mealPreferenceContainer,
  mealsDetailsContainer,
  mealTypeHeading,
  saveButton,
  skipMealButton,
} from "./styles";
import {
  MealPreferenceEnum,
  MealTypeEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";

interface MealPreferenceModalPropsType {
  date: string;
}

const MealPreferenceModal: React.FC<MealPreferenceModalPropsType> = ({
  date,
}) => {
  const [activeTab, setActiveTab] = useState(MealPreferenceEnum.FULL);
  const [showSaveConfirmModal, setShowSaveConfirmModal] =
    useState<boolean>(false);
  const [showCloseConfirmModal, setShowBackConfirmModal] =
    useState<boolean>(false);
  const [showSkipConfirmModal, setShowSkipConfirmModal] =
    useState<boolean>(false);

  const type = ModalStore.typeOfMeal.toLocaleLowerCase();
  function handleActiveTab(activeType: MealPreferenceEnum): void {
    setActiveTab(activeType);
  }
  const handleOpenSkipConfirmModal: VoidFunctionType = () => {
    setShowSkipConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const headerSection: ReactElementType = () => {
    return (
      <div className={headerContainer}>
        <h1 className={mealTypeHeading}>{ModalStore.typeOfMeal}</h1>
        <button onClick={handleOpenSkipConfirmModal} className={skipMealButton}>
          Skip Meals
        </button>
      </div>
    );
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

  const buttonsSection: ReactElementType = () => {
    return (
      <p className={buttonContainer}>
        <button className={backButton} onClick={handleClickBack}>
          Back
        </button>
        <button onClick={handleClickSave} className={saveButton}>
          Save
        </button>
      </p>
    );
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

  const renderConfirmModal: ReactElementType = () => {
    if (showSkipConfirmModal) {
      return (
        <SkipConfirmModal
          closeModal={handleCloseSkipConfirmModal}
          action={handleSkipMealPreference}
        />
      );
    } else if (showCloseConfirmModal) {
      return (
        <CloseConfirmModal
          closeModal={handleCloseMealPreferenceModal}
          closeConfirmModal={handleCloseConfirmModal}
        />
      );
    } else if (showSaveConfirmModal) {
      let editedMeal: any = CustomMealStore.meals.find(
        (each) => each.mealType === type
      );
      if (activeTab !== "custom") {
        editedMeal = {
          ...editedMeal,
          ["items"]: selectedMealTypeData(activeTab, editedMeal?.mealType),
        };
      }
      if (editedMeal?.mealId) {
        UserMealStore.setMealId(editedMeal?.mealId);
      }
      return (
        <SaveConfirmModal
          action={handleMealPreferenceSave}
          closeModal={() => setShowSaveConfirmModal(false)}
          activeTab={activeTab}
          customMutation={editedMeal}
          date={CustomMealStore.date}
        />
      );
    }
    return <></>;
  };

  const mealItems =
    scheduledMealStore.getMealDayData(date)[type as MealTypeEnum];

  if (ModalStore.typeOfMeal && mealItems) {
    return (
      <Modal>
        <div className={mealPreferenceContainer}>
          {headerSection()}
          <div className="flex items-center gap-6 mt-10">
            <MealTypesTab
              activeTab={activeTab}
              handelActiveTab={handleActiveTab}
            />
          </div>
          <div className={mealsDetailsContainer}>
            <Meals meals={mealItems} activeTab={activeTab} />
            <div>
              <img src={FOOD_URL} className="h-[250px] w-[250px]" />
            </div>
          </div>
          {buttonsSection()}
        </div>
        {renderConfirmModal()}
      </Modal>
    );
  }
};

export default observer(MealPreferenceModal);
