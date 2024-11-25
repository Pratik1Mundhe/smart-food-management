import React from "react";
import { observer } from "mobx-react-lite";

import foodItemsStore from "../../store/FoodItemsStore";
import { button, container } from "./styles";

const ToggleSwitch: React.FC = observer(() => {
  return (
    <div
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
