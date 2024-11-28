import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ACCESS_TOKEN_KEY, ADMIN_TOKEN, USERNAME_KEY } from "../../constants";
import { getItemLocalStorage } from "../../utils/localStorageUtils/getItem";
import { adminContainer, adminLogo } from "./styles";
import ScheduleMealController from "../../controllers/ScheduleMealController";
import HeadCountController from "../../controllers/HeadCountController";
import { AdminHomeTabs, PageRoutesEnum, ReactElementType } from "../../types";

const AdminHome: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AdminHomeTabs>(
    AdminHomeTabs.HEAD_COUNT
  );
  const { t } = useTranslation();
  const tPath = "pages.adminHome";
  const adminUsername = getItemLocalStorage(USERNAME_KEY) || "admin";
  // const accessToken = getItemLocalStorage(ACCESS_TOKEN_KEY);
  // const isAdmin = getItemLocalStorage(ADMIN_TOKEN);

  // if (accessToken === null) {
  //   return <Navigate to={PageRoutesEnum.REGISTER_PAGE} replace />;
  // }
  // if (!isAdmin) {
  //   return <Navigate to={PageRoutesEnum.HOME_PAGE} replace />;
  // }

  const handleClickScheduleMealTab = () => {
    setCurrentTab(AdminHomeTabs.SCHEDULE_MEAL);
  };
  const handleClickHeadCountTab = () => {
    setCurrentTab(AdminHomeTabs.HEAD_COUNT);
  };
  const renderAdminHomeTabs = () => {
    return (
      <ul className="flex items-center gap-10 mt-10 border-b-2 w-fit">
        <li
          onClick={handleClickScheduleMealTab}
          className={`pb-2 cursor-pointer ${
            currentTab === AdminHomeTabs.SCHEDULE_MEAL
              ? "border-b-2 border-b-primary"
              : "border-b-0"
          }`}
        >
          {t(tPath + ".tabs.scheduleMeal")}
        </li>
        <li
          onClick={handleClickHeadCountTab}
          className={`pb-2 cursor-pointer ${
            currentTab === AdminHomeTabs.HEAD_COUNT
              ? "border-b-2 border-b-primary"
              : "border-b-0"
          }`}
        >
          {t(tPath + ".tabs.headCount")}
        </li>
      </ul>
    );
  };
  const renderSection: ReactElementType = () => {
    switch (currentTab) {
      case AdminHomeTabs.SCHEDULE_MEAL:
        return <ScheduleMealController />;
      case AdminHomeTabs.HEAD_COUNT:
        return <HeadCountController />;
      default:
        return <></>;
    }
  };

  return (
    <div className={adminContainer}>
      <div className="flex items-center gap-2">
        <div className={adminLogo}>{adminUsername.slice(0, 2)}</div>
        <h1>{t("pages.adminHome.title")}</h1>
      </div>
      {renderAdminHomeTabs()}
      {renderSection()}
    </div>
  );
};

export default observer(AdminHome);
