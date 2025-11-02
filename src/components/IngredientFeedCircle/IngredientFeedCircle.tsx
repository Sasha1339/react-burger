import styles from './IngredientFeedCircle.module.css';
import {FC} from "react";

type Props = {
  name: string;
  url: string;
  translateX?: number
}

export const IngredientFeedCircle: FC<Props> = ({url, name, translateX = 0, ...props }) => {

  return (
    <div  style={{transform: `translateX(${translateX}px)`}} className={styles.image_content}>
      <img className={styles.image} src={url} alt={name}/>
    </div>
  )
}
