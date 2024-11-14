import React from "react";
import { VoidFunctionType } from "../../types";
import { observer } from "mobx-react-lite";
import foodItemsStore from "../../store/FoodItemsStore";
import useInCampusStatus from "../../apis/mutations/InCampusStatus/useInCampusStatus";
import UserMealStore from "../../store/UserMealStore";

const ToggleSwitch: React.FC = observer(() => {
  const { triggerCampusStatus, loading } = useInCampusStatus();
  const handleToggle: VoidFunctionType = () => {
    triggerCampusStatus;
    console.log(UserMealStore.userId);
    foodItemsStore.setInCampusStatus();
  };

  return (
    <div
      onClick={handleToggle}
      className={` w-[44px] p-1 rounded-3xl transition-all cursor-pointer duration-300 ease-in-out ${
        foodItemsStore.inCampusStatus ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <div
        className={`h-[16px] w-[16px] bg-white shadow-md rounded-full transition-all duration-300 ease-in-out
        ${foodItemsStore.inCampusStatus ? "translate-x-5" : ""}`}
      ></div>
    </div>
  );
});

export default ToggleSwitch;
