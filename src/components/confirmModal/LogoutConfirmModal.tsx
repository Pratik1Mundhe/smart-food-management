import React from "react";

import ConfirmModal from "../commonComponents/ConfirmModal";
import { ReactElementType } from "../../types";

import Loader from "../loader/Loader";

interface LogoutConfirmModalType {
  handleLogoutModal: () => void;
  handleCloseLogoutConfirmModal: () => void;
  logoutLoading: boolean;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalType> = (props) => {
  const { handleLogoutModal, handleCloseLogoutConfirmModal, logoutLoading } =
    props;

  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handleLogoutModal}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          {logoutLoading ? <Loader /> : "Logout"}
        </button>
        <button
          onClick={handleCloseLogoutConfirmModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <ConfirmModal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          Are you sure you want to close?
        </h1>
        {renderButtons()}
      </div>
    </ConfirmModal>
  );
};

export default LogoutConfirmModal;
