import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
  componentDidMount() {
    const { onFetchOrders } = this.props;
    onFetchOrders();
  }

  render() {
    const { orders, loading } = this.props;
    let order = <Spinner />;
    if (!loading) {
      order = orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
    }
    return (
      <div>
        {order}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
