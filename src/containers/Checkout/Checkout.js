import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';



class Checkout extends Component {

    componentWillMount () {
        /* Replacing below code with REDUX */
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // for(let param of query.entries()) {
        //     ingredients[param[0]] = +param[1];
        // }
        // this.setState({
        //     ingredients: ingredients
        // })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        console.log(this.props);
        let summary = <Redirect to="/" />;
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? (<Redirect to="/" />) : null;
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />

                <Route path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>);
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);