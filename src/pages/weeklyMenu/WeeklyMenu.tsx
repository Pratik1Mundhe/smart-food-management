import { observer } from "mobx-react-lite";
import React from "react";

const WeeklyMenu: React.FC = () => {
  return (
    <div className="text-center font-semibold text-2xl mt-10 ">Weekly Menu</div>
  );
};

export default observer(WeeklyMenu);
