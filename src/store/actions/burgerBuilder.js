import * as actionTypes from './actionTypes';
import axios from "../../axios/axios-order";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};


export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-93688.firebaseio.com/ingredients.json')
        .then((response) => {
            console.log(response.data);
            dispatch(setIngredients(response.data));
        })
        .catch(err => {
            console.log('Error ', err);
            dispatch(fetchIngredientsFailed());
        })
    };
}