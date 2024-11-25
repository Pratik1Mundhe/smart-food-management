import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import ConfirmModal from "../commonComponents/ConfirmModal";
import { MealTypeEnum, ReactElementType, VoidFunctionType } from "../../types";
import MealFoodItemModel from "../../models/MealFoodItemModel";

interface ConfirmModalPropsType {
  foodItem: MealFoodItemModel;
  handleCloseDeleteConfirmModal: VoidFunctionType;
  removeFoodItem: (id: string) => void;
  currentMealTab: MealTypeEnum;
  currentDate: Date;
}

const DeleteConfirmModal: React.FC<ConfirmModalPropsType> = ({
  foodItem,
  handleCloseDeleteConfirmModal,
  removeFoodItem,
}) => {
  const { name, id } = foodItem;

  const { t } = useTranslation();
  const tPath = "components.confirmModal.delete";

  const handleClickDelete: VoidFunctionType = () => {
    handleCloseDeleteConfirmModal();
    removeFoodItem(id);
  };

  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handleClickDelete}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {t(tPath + ".buttons.delete")}
        </button>
        <button
          onClick={handleCloseDeleteConfirmModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          {t(tPath + ".buttons.cancel")}
        </button>
      </div>
    );
  };

  return (
    <ConfirmModal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          {t(tPath + ".title")} {name}
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default observer(DeleteConfirmModal);
