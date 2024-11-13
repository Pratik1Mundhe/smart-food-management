import { createPortal } from "react-dom";
import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react";

import ModalStore from "../../store/ModalStore";
import { PORTAL_RENDER_ID } from "../../constants";

interface ModalProp {
  children: React.ReactNode;
}

const Modal = (props: ModalProp) => {
  const { children } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (ModalStore.isModalOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [ModalStore.isModalOpen]);

  const modalRenderContainer = document.getElementById(PORTAL_RENDER_ID);
  if (!modalRenderContainer) {
    return null;
  }

  return createPortal(
    <dialog ref={dialogRef} className="mx-auto mt-auto mb-[4%] modal">
      {children}
    </dialog>,
    modalRenderContainer
  );
};

export default observer(Modal);
