import React, {useEffect, useState} from 'react';
import {AppHeader} from "./components/AppHeader/AppHeader";
import  styles from './App.module.css';
import {BurgerIngredients} from "./components/BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "./components/BurgerConstructor/BurgerConstructor";
import {ingredientService} from "./api/ingredient.service";
import {Ingredient} from "./components/BurgerIngredients/types";


function App() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    ingredientService.getAllIngredients().then((response) => {
      setIngredients(response.data);
    }).catch((error) => {
      console.log(error.message);
    })
  }, [])

  return (
    <div className={styles.main}>
      <AppHeader />
      <main>
        <section>
          <BurgerIngredients ingredients={ingredients} />
        </section>
        <section>
          <BurgerConstructor ingredients={ingredients} />
        </section>
      </main>
    </div>
  );
}

export default App;
