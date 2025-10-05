import {FC, ReactNode} from "react";
import styles from "./IconLink.module.css";

type Props = {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

export const IconLink: FC<Props> = ({icon, onClick, children, ...props}) => {

  return (
    <div className={styles.wrapper} onClick={onClick}>
      { icon }
      <span className={styles.title}>
        { children }
      </span>
    </div>
  )

}