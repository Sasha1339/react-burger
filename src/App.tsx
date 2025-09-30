import {AppHeader} from "./components/AppHeader/AppHeader";
import  styles from './App.module.css';
import {BurgerIngredients} from "./components/BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "./components/BurgerConstructor/BurgerConstructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {


  return (
    <div className={styles.main}>
      <AppHeader />
      <main>
        <DndProvider backend={HTML5Backend}>
          <section>
            <BurgerIngredients />
          </section>
          <section>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
