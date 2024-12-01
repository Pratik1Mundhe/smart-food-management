import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import globalLogo from "../../assets/global-logo.png";
import ToggleSwitch from "../toggleButton/ToggleButton";
import {
  PageRoutesEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import ModalStore from "../../store/ModalStore";
import {
  headerContainer,
  headerMenu,
  headerMenuOption,
  redButton,
} from "./styles";
import LogoutController from "../../Controllers/LogoutController";

const Navbar: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const path = window.location.pathname;
  const [showLogoutConfirmModal, setLogoutConfirmModal] =
    useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [isEnglish, setIsEnglish] = useState(true);
  const { t, i18n } = useTranslation();

  function handelLanguage(lang: "en" | "te") {
    if (lang === "en") {
      setIsEnglish(true);
    } else {
      setIsEnglish(false);
    }
    i18n.changeLanguage(lang);
  }

  const renderCampusToggleButton: ReactElementType = () => {
    return (
      <li className="flex items-center gap-6">
        <p className="text-general text-sm font-medium">{t("inCampus")}</p>
        <ToggleSwitch />
      </li>
    );
  };

  const handleOpenLogoutConfirmModal: VoidFunctionType = () => {
    setLogoutConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const handleCloseLogoutConfirmModal: VoidFunctionType = () => {
    setLogoutConfirmModal(false);
    ModalStore.closeConfirmModal();
  };

  const renderLogout: ReactElementType = () => {
    if (showLogout) {
      return (
        <>
          <FaChevronUp
            className="text-sm cursor-pointer"
            onClick={() => setShowLogout((preVal) => !preVal)}
          />
          <div className="absolute top-12 right-10">
            <button
              className={redButton}
              onClick={handleOpenLogoutConfirmModal}
            >
              {t("Logout")}
            </button>
          </div>
        </>
      );
    }
    return (
      <FaChevronDown
        className="text-sm cursor-pointer"
        onClick={() => setShowLogout((preVal) => !preVal)}
      />
    );
  };

  const renderUserProfile: ReactElementType = () => {
    return (
      <li className="flex items-center gap-2">
        <LuUserCircle className="h-5 w-5" />
        <h1 className="text-general text-sm font-medium">{t("user")}</h1>
        {renderLogout()}
      </li>
    );
  };

  const renderLogoutConfirmModal: ReactElementType = () => {
    if (showLogoutConfirmModal) {
      return (
        <LogoutController
          handleCloseLogoutConfirmModal={handleCloseLogoutConfirmModal}
        />
      );
    }
    return <></>;
  };

  const changeLanguageButtons: ReactElementType = () => {
    if (isEnglish) {
      return (
        <button onClick={() => handelLanguage("te")} className="text-sm ">
          తెలుగు
        </button>
      );
    }
    return (
      <button onClick={() => handelLanguage("en")} className="text-sm ">
        English
      </button>
    );
  };

  return (
    <div className={headerContainer}>
      <img
        onClick={() => navigate(PageRoutesEnum.HOME_PAGE)}
        src={globalLogo}
        className="h-[60px] w-[60px] cursor-pointer"
      />

      <ul className={headerMenu}>
        {renderCampusToggleButton()}
        <li
          onClick={() => navigate(PageRoutesEnum.HOME_PAGE)}
          className={`${headerMenuOption} ${
            path === PageRoutesEnum.HOME_PAGE ? "text-primary" : "text-general"
          }`}
        >
          {t("home")}
        </li>
        {/* <li
          onClick={() => navigate(PageRoutesEnum.WEEKLY_MENU_PAGE)}
          className={`${headerMenuOption} ${
            path === PageRoutesEnum.WEEKLY_MENU_PAGE
              ? "text-primary"
              : "text-general"
          }`}
        >
          {t("weeklyMenu")}
        </li> */}
        <li
          onClick={() => navigate("/rating")}
          className={`${headerMenuOption} ${
            path === "/rating" ? "text-primary" : "text-general"
          }`}
        >
          {t("Ratings")}
        </li>
        <li
          onClick={() => navigate("/food_wastage_log")}
          className={`${headerMenuOption} ${
            path === "/food_wastage_log" ? "text-primary" : "text-general"
          }`}
        >
          WastageLog
        </li>
        {changeLanguageButtons()}
        {renderUserProfile()}
      </ul>
      {renderLogoutConfirmModal()}
    </div>
  );
};

export default Navbar;
