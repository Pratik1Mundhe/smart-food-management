import React from "react";
import { blueButton } from "./styles";
import { VoidFunctionType } from "../../types";
import { useTranslation } from "react-i18next";

interface FoodItemsErrorViewPropsType {
  tPath: string;
  handleRefetchFoodItems: VoidFunctionType;
}

const FoodItemsErrorView: React.FC<FoodItemsErrorViewPropsType> = ({
  tPath,
  handleRefetchFoodItems,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <h1>{t(tPath + ".errorView.title")}</h1>
      <button onClick={handleRefetchFoodItems} className={blueButton}>
        {t(tPath + ".buttons.retry")}
      </button>
    </div>
  );
};

export default FoodItemsErrorView;
