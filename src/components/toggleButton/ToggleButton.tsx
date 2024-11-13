import React, { useState } from "react";
import { VoidFunctionType } from "../../types";
import { observer } from "mobx-react-lite";

const ToggleSwitch: React.FC = observer(() => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggle: VoidFunctionType = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      onClick={handleToggle}
      className={` w-[44px] p-1 rounded-3xl transition-all cursor-pointer duration-300 ease-in-out ${
        isChecked ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <div
        className={`h-[16px] w-[16px] bg-white shadow-md rounded-full transition-all duration-300 ease-in-out
        ${isChecked ? "translate-x-5" : ""}`}
      ></div>
    </div>
  );
});

export default ToggleSwitch;
