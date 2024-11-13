import { useState } from "react";
import Modal from "../commonComponents/Modal";
import { observer } from "mobx-react";

import MealsTab from "../commonComponents/MealsTab";
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
import ModalStore from "../../Store/ModalStore";
import { FOOD_URL } from "./Constants";

const meals = [
  { item: "Poori", itemType: "indian Bread", half: 1, full: 2, custom: 0 },
  { item: "Fired Rice", itemType: "indian Bread", half: 1, full: 2, custom: 0 },
  { item: "Rice", itemType: "indian Bread", half: 1, full: 2, custom: 0 },
  { item: "Aloo", itemType: "indian Bread", half: 1, full: 2, custom: 0 },
];

const MealPreferenceModal = () => {
  const [activeTab, setActiveTab] = useState("full");

  function handelActiveTab(activeType: string): void {
    setActiveTab(activeType);
  }
  function handelBackButton() {
    ModalStore.closeModal();
    setActiveTab("full");
  }
  const headerSection = () => {
    console.log(ModalStore.typeOfMeal);
    return (
      <div className={headerContainer}>
        <h1 className={mealTypeHeading}>{ModalStore.typeOfMeal}</h1>
        <button className={skipMealButton}>Skip Meals</button>
      </div>
    );
  };

  const buttonsSection = () => {
    return (
      <p className={buttonContainer}>
        <button className={backButton} onClick={handelBackButton}>
          Back
        </button>
        <button className={saveButton}>Save</button>
      </p>
    );
  };

  return (
    <Modal>
      <div className={mealPreferenceContainer}>
        {headerSection()}
        <MealsTab activeTab={activeTab} handelActiveTab={handelActiveTab} />
        <div className={mealsDetailsContainer}>
          <Meals meals={meals} activeTab={activeTab} />
          <div>
            <img src={FOOD_URL} className="h-[250px] w-[250px]" />
          </div>
        </div>
        {buttonsSection()}
      </div>
    </Modal>
  );
};
export default observer(MealPreferenceModal);
