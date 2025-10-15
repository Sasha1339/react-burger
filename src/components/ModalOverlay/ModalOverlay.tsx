import {FC, forwardRef} from "react";
import styles from "./ModalOverlay.module.css";

type Props = {
  onClose?: () => void;
}

export const ModalOverlay: FC<Props> = ({onClose}) => {

  return (
    <div className={styles.modal_overlay} onClick={onClose}></div>
  )
}
