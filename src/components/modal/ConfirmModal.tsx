import React, { useEffect, useState } from "react";

import { ConfirmModalPropsTypes, VoidFunctionType } from "../../types";
import { confirmModalContent, modalContainer } from "./styles";
import { useTranslation } from "react-i18next";

const ConfirmModal: React.FC<ConfirmModalPropsTypes> = ({ close, action }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { t } = useTranslation();
  const tPath = "components.modal.confirmModal";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleModalClose: VoidFunctionType = () => {
    setIsVisible(false);
    setTimeout(() => {
      close();
    }, 300);
  };

  return (
    <div
      className={`${modalContainer} ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`${confirmModalContent} ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <h1>{t(tPath + ".title")}</h1>
        <div className="flex items-center self-end gap-4">
          <button
            onClick={handleModalClose}
            className="rounded border-2 px-5 py-2 text-general bg-white hover:bg-slate-100"
          >
            {t(tPath + ".buttons.no")}
          </button>
          <button
            onClick={action}
            className="rounded font-semibold px-5 py-2 text-white bg-primary hover:bg-blue-600"
          >
            {t(tPath + ".buttons.yes")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
