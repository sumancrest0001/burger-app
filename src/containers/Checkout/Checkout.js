import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import Contact from './Contact/Contact';
import * as actions from '../../store/actions/order';

class Checkout extends Component {

  componentDidMount() {
    const { onPurchaseInit } = this.props;
    onPurchaseInit();
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, purchased } = this.props;
    let summary = <Redirect to="/" />;
    if (ingredients) {
      const purchasedRedirect = purchased ? (<Redirect to="/" />) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ingredients}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinued={this.checkoutContinued}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={Contact}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);