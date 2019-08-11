import React, { Component } from "react";
import Wrapper from "../../hoc/wrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios/axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4.00,
        purchasable: false,
        ordered: false,
        loading: false,
        error: false
    };

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, currentVal) => {
                return sum += currentVal;
            }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        console.log('addIngredientHandler called...');
        let updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] += 1;
        let updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        //console.log(updatedIngredients);
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        console.log('removeIngredientHandler called...');
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        let updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] -= 1;
        let updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        //console.log(updatedIngredients);
        this.updatePurchasable(updatedIngredients);
    }

    orderHandler = () => {
        this.setState({
            ordered: true
        })
    };

    cancelOrderHander = () => {
        this.setState({
            ordered: false
        });
    }

    continueOrderHandler = () => {
        const ingredientsQuery = Object.keys(this.state.ingredients)
            .map((igKey) => {
                return encodeURIComponent(igKey) + '=' + encodeURIComponent(this.state.ingredients[igKey])
            });
        const queryString = ingredientsQuery.join('&');
        console.log(ingredientsQuery);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    componentDidMount () {
        axios.get('https://react-my-burger-93688.firebaseio.com/ingredients.json')
        .then((response) => {
            this.setState({
                ingredients: response.data
            })
        })
        .catch(err => {
            console.log('Error ', err);
            this.setState({error: true});
        })
    }

    render() {
        const disabledIngredients = { ...this.state.ingredients };
        for (let key in disabledIngredients) {
            disabledIngredients[key] = disabledIngredients[key] <= 0;
        }
        let modalText = null;
        if(this.state.loading) {
            modalText = <Spinner />
        }
        let burger = <Spinner />;
        if(this.state.ingredients) {
            burger = (<Wrapper><Burger ingredients={this.state.ingredients} />
                        <BuildControls addIngredientHandler={this.addIngredientHandler}
                            removeIngredientHandler={this.removeIngredientHandler}
                            disabledIngredients={disabledIngredients}
                            totalPrice={this.state.totalPrice}
                            purchasable={this.state.purchasable} 
                            orderHandler = {this.orderHandler} />
                     </Wrapper>);
            modalText = <OrderSummary ingredients = {this.state.ingredients} 
                            cancelOrderHander = {this.cancelOrderHander} 
                            continueOrderHandler = {this.continueOrderHandler} 
                            totalPrice = {this.state.totalPrice} />;
        }
        if(this.state.error) {
            burger = <p>Unable to Load Ingredients from server</p>
        }
        return (
            <Wrapper>
               {/* ShouldComponentUpdate of Modal will also control rendering for child elements within */}
                <Modal show = {this.state.ordered} closeModal = {this.cancelOrderHander} >
                    {modalText}
                </Modal>
                {burger}
            </Wrapper>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);