import {FC, ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./Modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals")!;

type Props = {
  header?: string;
  children?: ReactNode;
  onClose?: () => void;
}

export const Modal: FC<Props> = ({header, children, onClose, ...props}) => {



  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      onClose?.();
    }
  }

  return (
    createPortal(
      (
        <>
          <ModalOverlay onClose={onClose} />
          <div className={styles.modal}>
            <div className={styles.header}>
              <span>{header}</span>
              <CloseIcon onClick={onClose} type={'primary'} />
            </div>
            {children}
          </div>
        </>
      ),
      modalRoot
    )
  )

}