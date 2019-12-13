import React from "react";
import Wrapper from "../../../hoc/wrapper";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientsList = Object.keys(props.ingredients)
        .map(igKey => <li key={igKey} ><span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>);
    return (<Wrapper>
        <h2>Your Order Summary</h2>
        <p>Burger with Following Ingredients:</p>
        <ul>
            {ingredientsList}
        </ul>
        <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType = 'Danger' clickHandler = {props.cancelOrderHander}>CANCEL</Button>
        <Button btnType = 'Success' clickHandler = {props.continueOrderHandler} >CONTINUE</Button>
    </Wrapper>
    );
};

export default orderSummary;