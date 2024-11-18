import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import globalLogo from "../../assets/global-logo.png";
import LogoutConfirmModal from "../confirmModal/LogoutConfirmModal";
import { PageRoutesEnum, ReactElementType } from "../../types";
import ModalStore from "../../store/ModalStore";

const AdminNavbar: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const path = window.location.pathname;
  const [showLogoutConfirmModal, setLogoutConfirmModal] =
    useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const handleOpenLogoutConfirmModal = (): void => {
    setLogoutConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const handleCloseLogoutConfirmModal = (): void => {
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
          <button
            className="bg-red-500 text-white text-sm hover:bg-red-600 p-2 rounded-md"
            onClick={handleOpenLogoutConfirmModal}
          >
            Logout
          </button>
        </div>
      );
    }
    return <></>;
  };

  const renderUserProfile: ReactElementType = () => {
    return (
      <li className="flex items-center gap-2 relative">
        <LuUserCircle className="h-5 w-5" />
        <h1 className="text-general text-sm font-medium">Admin</h1>
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
    <div className="flex items-center justify-between px-10 border-b-[1px]">
      <img
        onClick={() => navigate(PageRoutesEnum.ADMIN_HOME_PAGE)}
        src={globalLogo}
        className="h-[60px] w-[60px] cursor-pointer"
      />

      <ul className="flex justify-between items-center gap-4 w-[200px]">
        <li
          onClick={() => navigate(PageRoutesEnum.ADMIN_HOME_PAGE)}
          className={`text-general text-sm font-medium cursor-pointer ${
            path === PageRoutesEnum.ADMIN_HOME_PAGE
              ? "text-primary"
              : "text-general"
          }`}
        >
          Home
        </li>
        {renderUserProfile()}
      </ul>
      {renderLogoutConfirmModal()}
    </div>
  );
};

export default AdminNavbar;
