
import {FC} from "react";
import styles from './FeedCommonInfo.module.css';

type Props = {
  ready: number[];
  inProcess: number[];
  allTimes: number;
  today: number;
}

export const FeedCommonInfo: FC<Props> = ({ready, inProcess, allTimes, today, ...props }) => {

  return (
    <div className={styles.article}>
      <div className={styles.up_info}>
        <div className={styles.header_up}>
        <div className={styles.default_text}>Готовы:</div>
        <div className={styles.ready}>
          {ready.filter((_, i) => i < 20).map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
        </div>

          <div className={styles.header_up}>
            <div className={styles.default_text}>В работе:</div>
            <div className={styles.in_process}>
            {inProcess.filter((_, i) => i < 20).map((e, i) => (
              <div key={i}>{e}</div>
            ))}
            </div>
          </div>

      </div>
      <div className={styles.columns}>
        <div className={styles.default_text}>Выполнено за все время:</div>
        <div className={styles.amount}>{allTimes}</div>
      </div>
      <div className={styles.columns}>
        <div className={styles.default_text}>Выполнено за сегодня:</div>
        <div className={styles.amount}>{today}</div>
      </div>
    </div>
  )
}
