import {FC} from "react";
import styles from "../UnitInfo/UnitInfo.module.css";

type Props = {
  title: string;
  amount: number;
}

export const UnitInfo: FC<Props> = ({title, amount, ...props}) => {

  return (
    <div className={styles.info}>
      <p>{title}</p>
      <p>{amount}</p>
    </div>
  )
}
