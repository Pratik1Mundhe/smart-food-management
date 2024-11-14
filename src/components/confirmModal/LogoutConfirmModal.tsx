import React from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../commonComponents/Modal";
import { ReactElementType } from "../../types";
import ModalStore from "../../store/ModalStore";
import { ACCESS_TOKEN } from "../../constants";

const LogoutConfirmModal: React.FC = () => {
  const navigate = useNavigate();
  function handleLogoutModal() {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/login");
    ModalStore.closeConfirmModal;
  }
  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handleLogoutModal}
          className="bg-error text-sm text-white px-5 py-2 rounded font-semibold"
        >
          Logout
        </button>
        <button
          onClick={ModalStore.closeModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <Modal>
      <div className="flex flex-col gap-12">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          Are you sure you want to Logout
        </h1>
        {renderButtons()}
      </div>
    </Modal>
  );
};

export default LogoutConfirmModal;
