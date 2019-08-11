import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css"

const burger = (props) => {
    const ingredients = props.ingredients;
    let ingredientsList = Object.keys(ingredients).map(igKey => { 
        return [...Array(ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key = {igKey + i}type = {igKey} />
        }); 
    }).reduce((prev, current) => {
        return prev.concat(current);
    }, []);
    console.log(ingredientsList);
    if(ingredientsList.length === 0) {
        ingredientsList = (<p>Please start adding Ingredients !!!</p>)
    }
    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top" />
            {ingredientsList}
            <BurgerIngredient type = "bread-bottom" />
        </div>
    );
}

export default burger;