import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes Well!!!</h1>
            <div className={classes.BurgerContainer}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clickHandler={props.checkoutCancelled} >CANCEL</Button>
            <Button btnType="Success" clickHandler={props.checkoutContinued} >CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;