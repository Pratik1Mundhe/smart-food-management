import React from "react";
import { useNavigate } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

import globalLogo from "../../assets/global-logo.png";
import LogoutConfirmModal from "../confirmModal/LogoutConfirmModal";
import { PageRoutesEnum } from "../../types";
import ModalStore from "../../store/ModalStore";

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [showLogoutConfirmModal, setLogoutConfirmModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleOpenLogoutConfirmModal = () => {
    setLogoutConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const handleCloseLogoutConfirmModal = () => {
    setLogoutConfirmModal(false);
    ModalStore.closeConfirmModal();
  };

  const renderLogout = () => {
    if (showLogout) {
      return (
        <>
          <FaChevronUp
            className="text-sm cursor-pointer"
            onClick={() => setShowLogout((prev) => !prev)}
          />
          <div className="absolute top-12 right-10">
            <button
              className="bg-red-500 text-white text-[12px] hover:bg-red-600 p-2 rounded-md"
              onClick={handleOpenLogoutConfirmModal}
            >
              Logout
            </button>
          </div>
        </>
      );
    }
    return (
      <FaChevronDown
        className="text-sm cursor-pointer"
        onClick={() => setShowLogout((prev) => !prev)}
      />
    );
  };

  const renderUserProfile = () => {
    return (
      <li className="flex items-center gap-2">
        <LuUserCircle className="h-5 w-5" />
        <h1 className="text-general text-sm font-medium">Admin</h1>
        {renderLogout()}
      </li>
    );
  };

  const renderLogoutConfirmModal = () => {
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
