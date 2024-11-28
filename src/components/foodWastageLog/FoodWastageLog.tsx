import { MealTypeEnum } from "../../types";
import MealTabs from "../mealTabs/MealTabs";
import MealDay from "../MealDay/MealDay";
import FoodQuantityInput from "./FoodQuantityInput";
import FoodWastageTable from "./FoodWastagetable";
import Button from "../commonComponents/Button";
import { observer } from "mobx-react";
import { ReviewTypes } from "../../store/FoodWastageStore";

interface FoodWastageLogType {
  currentMealTab: MealTypeEnum;
  handleTabChange: (mealType: MealTypeEnum) => void;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  mealWastageData: ReviewTypes;
  handelFoodPrepared: (value: number | string) => void;
  handelFoodWasted: (value: number | string) => void;
}

const FoodWastageLog: React.FC<FoodWastageLogType> = (props) => {
  const {
    currentMealTab,
    handleTabChange,
    currentDate,
    setCurrentDate,
    mealWastageData,
    handelFoodPrepared,
    handelFoodWasted,
  } = props;
  const renderHeaderSection = () => {
    return (
      <div className="flex flex-row justify-between">
        <MealTabs
          currentMealTab={currentMealTab}
          handleTabChange={handleTabChange}
        />
        <MealDay currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
    );
  };
  const renderTotalMealWastageAndPrepared = () => {
    return (
      <ul className="flex flex-col gap-10 mt-10">
        <li className="flex flex-row gap-3 items-center">
          <p className="text-blue-700 w-[150px] text-[16px] font-semibold">
            Food Prepared
          </p>
          <FoodQuantityInput
            quantity={mealWastageData[currentMealTab]!.totalFoodPrepared}
            onChange={handelFoodPrepared}
          />
        </li>
        <li className="flex flex-row gap-3">
          <p className="text-blue-700 w-[150px] text-[16px] font-semibold  ">
            Food Wasted
          </p>
          <FoodQuantityInput
            quantity={mealWastageData[currentMealTab]!.totalFoodWasted}
            onChange={handelFoodWasted}
          />
        </li>
        <hr className="border-grey-200 border-t-2" />
      </ul>
    );
  };
  const renderButtonSection = () => {
    return (
      <p className="flex flex-row gap-4 justify-end align-bottom">
        <Button outline>Back</Button>
        <Button filled color="bg-blue-500" hoverColor="hover:bg-blue-700">
          Submit
        </Button>
      </p>
    );
  };
  const renderEmptyMeal = () => {
    return (
      <>
        {renderTotalMealWastageAndPrepared()}
        <FoodWastageTable mealData={mealWastageData[currentMealTab]!.items} />
      </>
    );
  };
  return (
    <div className="w-[920px] h-[600px] bg-white shadow-lg p-10">
      {renderHeaderSection()}
      {renderEmptyMeal()}
      {renderButtonSection()}
    </div>
  );
};
export default observer(FoodWastageLog);
