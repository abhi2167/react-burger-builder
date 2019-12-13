import React from 'react';
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl.js";
const buildControls = (props) => {
    const controls = [
        { label: 'Salad', type: 'salad'},
        { label: 'Bacon', type: 'bacon'},
        { label: 'Cheese', type: 'cheese'},
        { label: 'Meat', type: 'meat'}
    ];
    return (
        <div className = {classes.BuildControls}>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map( ctrl => (
                <BuildControl key = {ctrl.label} label= {ctrl.label} 
                    addIngredientHandler = {() => props.addIngredientHandler(ctrl.type)} 
                    removeIngredientHandler = {() => props.removeIngredientHandler(ctrl.type)}
                    disabled = {props.disabledIngredients[ctrl.typ]} />
            ))}
            <button className = {classes.OrderButton}
                disabled = {!props.purchasable} 
                onClick = {props.orderHandler} >ORDER NOW</button>
        </div>
    );
};

export default buildControls;