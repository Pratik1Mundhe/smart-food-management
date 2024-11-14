import React from "react";
import ScheduleMeal from "../../components/scheduleMeal/ScheduleMeal";
import { observer } from "mobx-react-lite";
import { ACCESS_TOKEN } from "../../constants";
import { Navigate } from "react-router-dom";
import { PageRoutesEnum } from "../../types";

const AdminHome: React.FC = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const isAdmin = localStorage.getItem("admin");
  if (accessToken === null) {
    return <Navigate to={PageRoutesEnum.LOGIN_PAGE} replace />;
  }
  if (!isAdmin) {
    return <Navigate to={PageRoutesEnum.HOME_PAGE} replace />;
  }
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
