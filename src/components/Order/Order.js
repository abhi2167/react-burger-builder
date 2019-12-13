import React from 'react';
import classes from './Order.css'

const order = (props) => {
    const ingredients = [];
    for(let igName in props.ingredients) {
        ingredients.push({
            name: igName,
            amount: props.ingredients[igName]
        });
    }
    const ingredientsOutput = ingredients.map(ingredient => {
        return (<span key={ingredient.name}
                style={{
                    textTransform: 'Capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    padding: '5px',
                    border: '1px solid #ccc'
                }}>{ingredient.name}: ({ingredient.amount}) </span>);
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientsOutput}</p>
            <p>Total price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default order;