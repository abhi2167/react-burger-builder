import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios/axios-order';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    };
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
       .then(res => {
           console.log('Response from API ', res);
            dispatch(purchaseBurgerSuccess(res.data.name, orderData));
       })
       .catch(err => {
           console.log('API Error : ', err);
           dispatch(purchaseBurgerFailed(err));
       });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess= (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}

export const fetchOrdersFail= (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    };
}

export const fetchOrdersInit= () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    };
}

export const fetchOrders = () => {
    return (dispatch) => {
        axios.get('/orders.json')
            .then((res) => {
                //this.setState({loading: false});
                dispatch(fetchOrdersInit());
                const fetchedOrders = [];
                for(let orderId in res.data) {
                    fetchedOrders.push({
                        ...res.data[orderId],
                        orderId
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                //this.setState({loading: false});
                console.log(err);
                dispatch(fetchOrdersFail(err));
            })
    };
}