import {FC} from "react";
import {DndProvider} from "react-dnd";
import styles from "./ConstructorPage.module.css";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../../components/BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "../../components/BurgerConstructor/BurgerConstructor";

type Props = {}

export const ConstructorPage: FC<Props> = ({...props}) => {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.section}>
          <BurgerIngredients/>
        </section>
        <section className={styles.section}>
          <BurgerConstructor/>
        </section>
      </DndProvider>
    </main>
  )
}
