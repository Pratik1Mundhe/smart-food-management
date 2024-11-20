import React from "react";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ACCESS_TOKEN, ADMIN_TOKEN, USERNAME_KEY } from "../../constants";
import { getItemLocalStorage } from "../../utils/localStorageUtils/getItem";
import { PageRoutesEnum } from "../../types";
import { adminContainer, adminLogo } from "./styles";
import ScheduleMealController from "../../controllers/ScheduleMealController";

const AdminHome: React.FC = () => {
  const { t } = useTranslation();
  const adminUsername = getItemLocalStorage(USERNAME_KEY) || "admin";
  const accessToken = getItemLocalStorage(ACCESS_TOKEN);
  const isAdmin = getItemLocalStorage(ADMIN_TOKEN);

  if (accessToken === null) {
    return <Navigate to={PageRoutesEnum.LOGIN_PAGE} replace />;
  }
  if (!isAdmin) {
    return <Navigate to={PageRoutesEnum.HOME_PAGE} replace />;
  }

  return (
    <div className={adminContainer}>
      <div className="flex items-center gap-2">
        <div className={adminLogo}>{adminUsername.slice(0, 2)}</div>
        <h1>{t("pages.adminHome.title")}</h1>
      </div>
      <ScheduleMealController />
    </div>
  );
};

export default observer(AdminHome);
