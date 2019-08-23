import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: false
    // }
    componentDidMount() {
        // axios.get('/orders.json')
        //     .then((res) => {
        //         this.setState({loading: false});
        //         const fetchedOrders = [];
        //         for(let orderId in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[orderId],
        //                 orderId
        //             });
        //         }
        //         console.log(fetchedOrders);
        //         this.setState({
        //             orders: fetchedOrders
        //         });
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //         console.log(err);
        //     });
        this.props.fetchOrders();
    }

    render() {
        let orders = (<Spinner />);
        if(!this.props.loading) {
            orders = this.props.orders.map(order => {
                return (<Order key={order.orderId} ingredients={order.ingredients} price={order.price}/>);
            });
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));