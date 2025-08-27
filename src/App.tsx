import React from 'react';
import {AppHeader} from "./components/AppHeader/AppHeader";
import  styles from './App.module.css';
import {BurgerIngredients} from "./components/BurgerIngredients/BurgerIngredients";
import {ingredients} from "./components/BurgerIngredients/mock";

function App() {
  return (
    <div className={styles.main}>
      <AppHeader></AppHeader>
      <main>
        <section>
          <BurgerIngredients ingredients={ingredients}/>
        </section>
      </main>
    </div>
  );
}

export default App;
