import { useState } from "react";

import TabBar from "./TabBar";
import { MealTypes } from "../../types";
import { mealTypeHeading } from "./styles";
import BarChart from "./BarChart";
import dummyWastageData from "../../dummyWeeklyWastageData";

const FoodWastageGraph = () => {
  const [activeTab, setActiveTab] = useState(MealTypes.ALL);

  function handleActiveTab(activeType: MealTypes): void {
    setActiveTab(activeType);
  }

  const renderPageHeading = () => {
    return (
      <div className="flex flex-row justify-between my-10">
        <h1 className={mealTypeHeading}>Weekly food wastage</h1>
      </div>
    );
  };

  const renderFoodWastageDetails = () => {
    return (
      <div className="flex flex-row justify-around">
        <p className="text-[28px] flex flex-col">
          <p className="flex flex-row items-center gap-2">
            {dummyWastageData[activeTab].total}{" "}
            <span className="text-[16px]">Kgs</span>
          </p>
          <span className="text-sm text-gray-400">foodWasted</span>
        </p>
        <p className="text-[28px] flex flex-col">
          <p className="flex flex-row items-center gap-2">
            {dummyWastageData[activeTab].served}
            <span className="text-[16px]">Peoples</span>
          </p>
          <span className="text-sm text-gray-400">can be Served</span>
        </p>
      </div>
    );
  };

  const renderWastagePercentage = () => {
    return (
      <p className="flex flex-row gap-5 mt-6 text-[24px] text-red-500 items-center pl-5">
        {dummyWastageData[activeTab].percentage}%
        <span className="text-sm text-gray-400"> Since Last Monday</span>
      </p>
    );
  };

  const renderWastageDetailsContainer = () => {
    return (
      <div className="flex flex-row justify-evenly w-[1200px] h-[450px] border-2 border-[#D7DFE9]">
        <BarChart wastageData={dummyWastageData[activeTab].wastageData} />
        <div className="h-[200px] p-4 w-[300px] border-2 border-[#D7DFE9] rounded-sm mt-20">
          {renderFoodWastageDetails()}
          <hr className="border-grey-200 border-t-2 mt-8" />
          {renderWastagePercentage()}
        </div>
      </div>
    );
  };

  const renderTabBar = () => {
    return (
      <div className="flex items-center gap-6 mt-10 mb-2 ml-6">
        <TabBar activeTab={activeTab} handelActiveTab={handleActiveTab} />
      </div>
    );
  };
  return (
    <div>
      {renderPageHeading()}
      {renderTabBar()}
      {renderWastageDetailsContainer()}
    </div>
  );
};

export default FoodWastageGraph;
