import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then((res) => {
                this.setState({loading: false});
                const fetchedOrders = [];
                for(let orderId in res.data) {
                    fetchedOrders.push({
                        ...res.data[orderId],
                        orderId
                    });
                }
                console.log(fetchedOrders);
                this.setState({
                    orders: fetchedOrders
                });
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
            })
    }

    render() {
        let orders = (<Spinner />);
        if(!this.state.loading) {
            orders = this.state.orders.map(order => {
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

export default Orders;