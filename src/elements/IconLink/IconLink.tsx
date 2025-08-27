import {FC, ReactNode} from "react";
import styles from "./IconLink.module.css";

type Props = {
  icon?: ReactNode;
  children: ReactNode;
}

export const IconLink: FC<Props> = ({icon, children, ...props}) => {

  return (
    <div className={styles.wrapper}>
      { icon }
      <span className={styles.title}>
        { children }
      </span>
    </div>
  )

}