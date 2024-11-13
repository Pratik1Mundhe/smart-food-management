import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import { VoidFunctionType } from "../../types";

interface ModalPropsTypes {
  close: () => void;
  children: React.ReactElement;
}

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
      className={`fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-60 transition-opacity duration-300  ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex relative flex-col rounded-lg bg-white gap-4 py-16 px-14  transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
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
