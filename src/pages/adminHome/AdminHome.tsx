import React from "react";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ScheduleMeal from "../../components/scheduleMeal/ScheduleMeal";
import { ACCESS_TOKEN, ADMIN_TOKEN } from "../../constants";
import { getItemLocalStorage } from "../../utils/localStorageUtils/getItem";
import { PageRoutesEnum } from "../../types";
import { adminContainer, adminLogo } from "./styles";

const AdminHome: React.FC = () => {
  const { t } = useTranslation();

  const accessToken = getItemLocalStorage(ACCESS_TOKEN);
  const isAdmin = getItemLocalStorage(ADMIN_TOKEN);
  if (accessToken === null) {
    return <Navigate to={PageRoutesEnum.LOGIN_PAGE} replace />;
  }
  if (!isAdmin) {
    return <Navigate to={PageRoutesEnum.HOME_PAGE} replace />;
  }

  //add dynamic logo based on username
  return (
    <div className={adminContainer}>
      <div className="flex items-center gap-2">
        <div className={adminLogo}>SC</div>
        <h1>{t("pages.adminHome.title")}</h1>
      </div>
      <ScheduleMeal />
    </div>
  );
};

export default observer(AdminHome);
