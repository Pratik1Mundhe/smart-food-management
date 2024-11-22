import Modal from "../commonComponents/Modal";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import MealTypesTab from "../commonComponents/MealTypesTab";
import { FOOD_URL } from "../../constants";
import SaveConfirmModal from "../confirmModal/SaveConfirmModal";
import CloseConfirmModal from "../confirmModal/CloseConfirmModal";
import SkipConfirmModal from "../confirmModal/SkipConfirmModal";
import Meals from "./Meals";
import Button from "../commonComponents/Button";
import { ReactElementType } from "../../types";
import { MealPreferenceModalPropsType } from "../../types";
import {
  buttonContainer,
  headerContainer,
  mealPreferenceContainer,
  mealsDetailsContainer,
  mealTypeHeading,
  skipMealButton,
} from "./styles";

const MealPreferenceModal: React.FC<MealPreferenceModalPropsType> = (props) => {
  const { t } = useTranslation();

  const {
    mealType,
    activeTab,
    handleActiveTab,
    setShowSaveConfirmModal,
    mealItems,
    actions,
    handleTriggerUserPreference,
    saveMealPreferenceLoading,
  } = props;
  const renderHeaderSection: ReactElementType = () => {
    return (
      <div className={headerContainer}>
        <h1 className={mealTypeHeading}>{t(`${mealType}`)}</h1>
        <button onClick={actions.skip.handleModal} className={skipMealButton}>
          {t("skipMeals")}
        </button>
      </div>
    );
  };

  const renderMealsSection = () => {
    return (
      <div className={mealsDetailsContainer}>
        <Meals meals={mealItems} activeTab={activeTab} />
        <div>
          <img src={FOOD_URL} className="h-[250px] w-[250px]" />
        </div>
      </div>
    );
  };

  const renderMealTabSection = () => {
    return (
      <div className="flex items-center gap-6 mt-10">
        <MealTypesTab activeTab={activeTab} handelActiveTab={handleActiveTab} />
      </div>
    );
  };

  const renderButtonsSection: ReactElementType = () => {
    return (
      <p className={buttonContainer}>
        <Button outline onClick={actions.close.handleAction}>
          {t("back")}
        </Button>
        <Button
          onClick={actions.save.handleAction}
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
      case actions.skip.isModalOpen: {
        return (
          <SkipConfirmModal
            closeModal={actions.skip.handleAction}
            action={actions.skip.handleMealPreference}
          />
        );
      }
      case actions.close.isModalOpen &&
        actions.close.handleModal !== undefined: {
        return (
          <CloseConfirmModal
            closeModal={actions.close.handleMealPreference}
            closeConfirmModal={actions.close.handleModal}
          />
        );
      }
      case actions.save.isModalOpen: {
        return (
          <SaveConfirmModal
            action={actions.save.handleMealPreference}
            closeModal={() => setShowSaveConfirmModal(false)}
            isUserMealSave={true}
            handleTriggerUserPreference={handleTriggerUserPreference}
            saveMealPreferenceLoading={saveMealPreferenceLoading}
          />
        );
      }
      default:
        return <></>;
    }
  };

  if (mealType && mealItems) {
    return (
      <Modal>
        <div className={mealPreferenceContainer}>
          {renderHeaderSection()}
          {renderMealTabSection()}
          {renderMealsSection()}
          {renderButtonsSection()}
        </div>
        {renderConfirmModal()}
      </Modal>
    );
  }
};

export default observer(MealPreferenceModal);
