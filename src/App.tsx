import React from 'react';
import {AppHeader} from "./components/AppHeader/AppHeader";
import  styles from './App.module.css';
import {BurgerIngredients} from "./components/BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "./components/BurgerConstructor/BurgerConstructor";
import {withIngredients} from "./hocs/withIngredients";

const BurgerConstructorWithIngredients = withIngredients(BurgerConstructor);
const BurgerIngredientsWithIngredients = withIngredients(BurgerIngredients);


function App() {
  return (
    <div className={styles.main}>
      <AppHeader />
      <main>
        <section>
          <BurgerIngredientsWithIngredients />
        </section>
        <section>
          <BurgerConstructorWithIngredients />
        </section>
      </main>
    </div>
  );
}

export default App;
