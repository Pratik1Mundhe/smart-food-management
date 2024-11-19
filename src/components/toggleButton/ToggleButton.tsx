import React from "react";
import { observer } from "mobx-react-lite";

import { VoidFunctionType } from "../../types";
import foodItemsStore from "../../store/FoodItemsStore";
import useInCampusStatus from "../../apis/mutations/SaveInCampusStatus/useInCampusStatus";
import Loader from "../loader/Loader";
import { USER_TOKEN } from "../../constants";
import { button, container } from "./styles";

const ToggleSwitch: React.FC = observer(() => {
  const { triggerCampusStatus, loading } = useInCampusStatus();
  const handleToggle: VoidFunctionType = () => {
    const userId = JSON.parse(localStorage.getItem(USER_TOKEN)!);
    triggerCampusStatus({
      userId: userId,
      inCampus: !foodItemsStore.inCampusStatus,
    });
    // foodItemsStore.setInCampusStatus();
  };
  if (loading) {
    return <Loader color="blue" />;
  }
  return (
    <div
      onClick={handleToggle}
      className={`${container} ${
        foodItemsStore.inCampusStatus ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <div
        className={`${button}
        ${foodItemsStore.inCampusStatus ? "translate-x-5" : ""}`}
      ></div>
    </div>
  );
});

export default ToggleSwitch;
