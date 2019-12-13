import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div>
        <div className = {classes.BuildControl}>
            <div className = {classes.Label}>{props.label}</div>
            <button className = {classes.Less} 
                onClick = {props.removeIngredientHandler}
                disabled = {props.disabled} >Less</button>
            <button className = {classes.More} 
                onClick = {props.addIngredientHandler}
                disabled = {props.disabled} >More</button>
        </div>
    </div>
);

export default buildControl;