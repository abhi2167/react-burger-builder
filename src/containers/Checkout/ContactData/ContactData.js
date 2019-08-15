import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios/axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street1: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
       const formData = {};
       for(let formElement in this.state.orderForm) {
           formData[formElement] = this.state.orderForm[formElement].value;
       }
       const order = {
           ingredients: this.props.ings,
           price: this.props.price,
           orderData: formData
       }
       axios.post('/orders.json', order)
       .then(res => {
           console.log('Response from API ', res);
           this.props.history.push('/');
       })
       .catch(err => {
           console.log('API Error : ', err);
       })
       .finally(() => {
            this.setState({
                loading: false
            });
       });
    }

    onChangeHandler = (event, formIdentifier) => {
        const orderFormClone = {...this.state.orderForm};
        const orderFormElement = {...orderFormClone[formIdentifier]}
        orderFormElement.value = event.target.value;
        orderFormClone[formIdentifier] = orderFormElement;
        this.setState({orderForm: orderFormClone});
    }

    render() {
        let formElements = [];
        for(let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form>
            {formElements.map(formElement => (
                 <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    onChangeHandler={(event) => this.onChangeHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success"  clickHandler={this.orderHandler} >ORDER</Button>
        </form>);
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>PleaseEnter your Contact Information</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);