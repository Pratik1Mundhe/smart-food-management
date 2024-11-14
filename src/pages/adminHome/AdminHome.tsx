import React from "react";
import ScheduleMeal from "../../components/scheduleMeal/ScheduleMeal";
import { observer } from "mobx-react-lite";

const AdminHome: React.FC = () => {
  return (
    <div className="max-w-[1000px] mx-auto mt-10 pb-6">
      <div className="flex items-center gap-2">
        <div className="bg-[#F13838] text-white rounded h-10 w-10 flex justify-center items-center">
          SC
        </div>
        <h1>Admin Portal</h1>
      </div>
      <ScheduleMeal />
    </div>
  );
};

export default observer(AdminHome);
