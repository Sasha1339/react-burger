import React from 'react';
import {AppHeader} from "./components/AppHeader/AppHeader";
import  styles from './App.module.css';
import {BurgerIngredients} from "./components/BurgerIngredients/BurgerIngredients";
import {ingredients, ingredientsCard} from "./components/BurgerIngredients/mock";
import {BurgerConstructor} from "./components/BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <div className={styles.main}>
      <AppHeader></AppHeader>
      <main>
        <section>
          <BurgerIngredients ingredients={ingredients}/>
        </section>
        <section>
          <BurgerConstructor ingredients={ingredientsCard}/>
        </section>
      </main>
    </div>
  );
}

export default App;
