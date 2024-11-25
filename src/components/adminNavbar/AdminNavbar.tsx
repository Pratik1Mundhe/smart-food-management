import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import globalLogo from "../../assets/global-logo.png";
import LogoutConfirmModal from "../confirmModal/LogoutConfirmModal";
import {
  PageRoutesEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import ModalStore from "../../store/ModalStore";
import {
  headerContainer,
  headerMenuItem,
  logo,
  menuContainer,
  redButton,
} from "./styles";
import { useTranslation } from "react-i18next";
import SelectLanguages from "../selectLanguages/SelectLanguages";
import { getItemLocalStorage } from "../../utils/localStorageUtils/getItem";
import { USERNAME_KEY } from "../../constants";

const AdminNavbar: React.FC = () => {
  const [showLogoutConfirmModal, setLogoutConfirmModal] =
    useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();

  const path = window.location.pathname;
  const tPath = "components.adminNavbar";
  const adminUsername = getItemLocalStorage(USERNAME_KEY) || "Admin";

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
        <FaChevronUp
          className="text-sm cursor-pointer"
          onClick={() => setShowLogout((prev) => !prev)}
        />
      );
    }
    return (
      <FaChevronDown
        className="text-sm cursor-pointer"
        onClick={() => setShowLogout((prev) => !prev)}
      />
    );
  };

  const renderLogoutButton: ReactElementType = () => {
    if (showLogout) {
      return (
        <div className="absolute top-8 right-0 bg-white">
          <button className={redButton} onClick={handleOpenLogoutConfirmModal}>
            {t(tPath + ".buttons.logout")}
          </button>
        </div>
      );
    }
    return <></>;
  };

  const navigateProfile = () => {
    navigate(PageRoutesEnum.PROFILE_PAGE);
  };

  const renderUserProfile: ReactElementType = () => {
    return (
      <li
        onClick={navigateProfile}
        className="flex items-center gap-2 relative cursor-pointer"
      >
        <LuUserCircle className="h-5 w-5" />
        <h1 className="text-general text-sm font-medium first-letter:capitalize">
          {adminUsername}
        </h1>
        {renderLogout()}
        {renderLogoutButton()}
      </li>
    );
  };

  const renderLogoutConfirmModal: ReactElementType = () => {
    if (showLogoutConfirmModal) {
      return (
        <LogoutConfirmModal
          handleCloseLogoutConfirmModal={handleCloseLogoutConfirmModal}
        />
      );
    }
    return <></>;
  };

  return (
    <div className={headerContainer}>
      <img
        onClick={() => navigate(PageRoutesEnum.ADMIN_HOME_PAGE)}
        src={globalLogo}
        className={logo}
      />

      <ul className={menuContainer}>
        <li>
          <SelectLanguages />
        </li>
        <li
          onClick={() => navigate(PageRoutesEnum.ADMIN_HOME_PAGE)}
          className={`${headerMenuItem} ${
            path === PageRoutesEnum.ADMIN_HOME_PAGE
              ? "text-primary"
              : "text-general"
          }`}
        >
          {t(tPath + ".menuOptions.home")}
        </li>
        {renderUserProfile()}
      </ul>
      {renderLogoutConfirmModal()}
    </div>
  );
};

export default AdminNavbar;
