import Modal from "../commonComponents/Modal";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import MealTypesTab from "../commonComponents/MealTypesTab";
import scheduledMealStore from "../../store/ScheduledMealStore";
import ModalStore from "../../store/ModalStore";
import { FOOD_URL } from "../../constants";
import SaveConfirmModal from "../confirmModal/SaveConfirmModal";
import CloseConfirmModal from "../confirmModal/CloseConfirmModal";
import SkipConfirmModal from "../confirmModal/SkipConfirmModal";
import Meals from "./Meals";
import Button from "../commonComponents/Button";
import {
  buttonContainer,
  headerContainer,
  mealPreferenceContainer,
  mealsDetailsContainer,
  mealTypeHeading,
  skipMealButton,
} from "./styles";
import { MealTypeEnum, ReactElementType } from "../../types";
import { MealPreferenceModalPropsType } from "../../types";
import { formatDate } from "../../utils/formatDate";
import UserMealStore from "../../store/UserMealStore";

const MealPreferenceModal: React.FC<MealPreferenceModalPropsType> = ({
  activeTab,
  handleActiveTab,
  setShowSaveConfirmModal,
  action,
}) => {
  const { t } = useTranslation();
  const type = ModalStore.typeOfMeal.toLocaleLowerCase();

  const headerSection: ReactElementType = () => {
    return (
      <div className={headerContainer}>
        <h1 className={mealTypeHeading}>{t(`${ModalStore.typeOfMeal}`)}</h1>
        <button onClick={action.skip.handleModal} className={skipMealButton}>
          {t("skipMeals")}
        </button>
      </div>
    );
  };

  const mealsSection = () => {
    return (
      <div className={mealsDetailsContainer}>
        <Meals meals={mealItems} activeTab={activeTab} />
        <div>
          <img src={FOOD_URL} className="h-[250px] w-[250px]" />
        </div>
      </div>
    );
  };

  const mealTabSection = () => {
    return (
      <div className="flex items-center gap-6 mt-10">
        <MealTypesTab activeTab={activeTab} handelActiveTab={handleActiveTab} />
      </div>
    );
  };

  const buttonsSection: ReactElementType = () => {
    return (
      <p className={buttonContainer}>
        <Button outline onClick={action.close.handleAction}>
          {t("back")}
        </Button>
        <Button
          onClick={action.save.handleAction}
          outline
          styles="bg-green-500 hover:bg-green-600 border-0 text-white"
        >
          {t("save")}
        </Button>
      </p>
    );
  };

  const renderConfirmModal: ReactElementType = () => {
    switch (true) {
      case action.skip.isModalOpen: {
        return (
          <SkipConfirmModal
            closeModal={action.skip.handleAction}
            action={action.skip.handleMealPreference}
          />
        );
      }
      case action.close.isModalOpen && action.close.handleModal !== undefined: {
        return (
          <CloseConfirmModal
            closeModal={action.close.handleMealPreference}
            closeConfirmModal={action.close.handleModal}
          />
        );
      }
      case action.save.isModalOpen: {
        return (
          <SaveConfirmModal
            action={action.save.handleMealPreference}
            closeModal={() => setShowSaveConfirmModal(false)}
            activeTab={activeTab}
            mealSave={true}
          />
        );
      }
      default:
        return <></>;
    }
  };

  const mealItems = scheduledMealStore.getMealDayData(
    formatDate(UserMealStore.data!)
  )[type as MealTypeEnum];
  if (ModalStore.typeOfMeal && mealItems) {
    return (
      <Modal>
        <div className={mealPreferenceContainer}>
          {headerSection()}
          {mealTabSection()}
          {mealsSection()}
          {buttonsSection()}
        </div>
        {renderConfirmModal()}
      </Modal>
    );
  }
};

export default observer(MealPreferenceModal);
