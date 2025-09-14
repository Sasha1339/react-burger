import {FC, SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {IngredientsType, navigationTypes} from "./types";
import {IngredientList} from "../IngredientsList/IngredientList";
import styles from "./BurgerIngredients.module.css";
import {IngredientNavigation} from "../IngredientNavigation/IngredientNavigation";
import {getIngredients, ingredientsSelectors} from "../../services/ingredients";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import { gsap } from 'gsap';
import {useSelector} from "react-redux";

type Props = {}

export const BurgerIngredients: FC<Props> = ({...props}) => {

  const dispatch = useAppDispatch();
  const ingredients = useSelector(ingredientsSelectors.ingredients);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const bunsContentRef = useRef<HTMLDivElement>(null);
  const sauceContentRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState(IngredientsType.BUN);

  useEffect(() => {
    dispatch(getIngredients())
  }, []);

  const onScrollIngredients = (event: SyntheticEvent) => {
    const bunsContentTopParent = bunsContentRef.current!.getBoundingClientRect().bottom - event.currentTarget.getBoundingClientRect().top;
    const sauceTopParent = sauceRef.current!.getBoundingClientRect().top - event.currentTarget.getBoundingClientRect().top;
    const sauceContentTopParent = sauceContentRef.current!.getBoundingClientRect().bottom - event.currentTarget.getBoundingClientRect().top;
    const mainTopParent = mainRef.current!.getBoundingClientRect().top - event.currentTarget.getBoundingClientRect().top;

    if (mainTopParent < 0 || sauceContentTopParent < 100) {
      setType(IngredientsType.MAIN)
    } else if (sauceTopParent < 0 || bunsContentTopParent < 100) {
      setType(IngredientsType.SAUCE)
    } else {
      setType(IngredientsType.BUN)
    }
  }

  const onChangeTab = useCallback((type: IngredientsType) => {
    switch (type) {
      case IngredientsType.BUN: {
        const bunsTopParent = bunsRef.current!.getBoundingClientRect().top - bunsRef.current!.parentElement!.getBoundingClientRect().top;
        gsap.to(bunsRef.current!.parentElement!, {
          scrollTop: bunsRef.current!.parentElement!.scrollTop + bunsTopParent,
          duration: 0.4,
          ease: 'power2.inOut'
        });
      }
      break;
      case IngredientsType.SAUCE: {
        const sauceTopParent = sauceRef.current!.getBoundingClientRect().top - sauceRef.current!.parentElement!.getBoundingClientRect().top;
        gsap.to(sauceRef.current!.parentElement!, {
          scrollTop: sauceRef.current!.parentElement!.scrollTop + sauceTopParent,
          duration: 0.4,
          ease: 'power2.inOut'
        });
      }
      break;
      case IngredientsType.MAIN: {
        const mainTopParent = mainRef.current!.getBoundingClientRect().top - mainRef.current!.parentElement!.getBoundingClientRect().top;
        gsap.to(mainRef.current!.parentElement!, {
          scrollTop: mainRef.current!.parentElement!.scrollTop + mainTopParent,
          duration: 0.4,
          ease: 'power2.inOut'
        });
      }
      break;
    }
  }, [])

  return (
    <div className={styles.ingredients}>
      <h1>Соберите бургер</h1>
      <div>
        <IngredientNavigation items={navigationTypes} type={type} onChangeTab={onChangeTab} />
      </div>
      <div className={styles.content} onScroll={onScrollIngredients}>
        <h2 ref={bunsRef}>Булки</h2>
        <IngredientList ref={bunsContentRef} items={ingredients.filter((e) => e.type === IngredientsType.BUN)}/>
        <h2 ref={sauceRef}>Соусы</h2>
        <IngredientList ref={sauceContentRef} items={ingredients.filter((e) => e.type === IngredientsType.SAUCE)}/>
        <h2 ref={mainRef}>Начинки</h2>
        <IngredientList ref={mainContentRef} items={ingredients.filter((e) => e.type === IngredientsType.MAIN)}/>
      </div>
    </div>
  )
}