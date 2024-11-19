import React from "react";
import { VoidFunctionType } from "../../types";
import { blueButton } from "./styles";
import { useTranslation } from "react-i18next";

interface FoodItemsEmptyViewPropsType {
  handleRefetchFoodItems: VoidFunctionType;
  tPath: string;
}

const FoodItemsEmptyView: React.FC<FoodItemsEmptyViewPropsType> = ({
  handleRefetchFoodItems,
  tPath,
}) => {
  const { t } = useTranslation();
  return (
    <div className={"flex flex-col items-start"}>
      <h1 className="text-general text-lg">{t(tPath + ".emptyView.title")}</h1>
      <button onClick={handleRefetchFoodItems} className={blueButton}>
        {t(tPath + ".buttons.retry")}
      </button>
    </div>
  );
};

export default FoodItemsEmptyView;
