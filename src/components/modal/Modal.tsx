import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import { ModalPropsTypes, VoidFunctionType } from "../../types";
import { modalContainer, modalContent } from "./styles";

const Modal: React.FC<ModalPropsTypes> = ({ close, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
        className={`${modalContent} ${isVisible ? "scale-100" : "scale-90"}`}
      >
        <button
          onClick={handleModalClose}
          className="absolute text-black top-4 right-4"
        >
          <IoClose className="text-xl" />
        </button>
        {children}
      </div>
      ;
    </div>
  );
};

export default Modal;
