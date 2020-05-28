import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import * as orderActions from '../../store/actions/order';
import * as authActions from '../../store/actions/auth';

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    }
  }
  componentDidMount() {
    const { onInitIngredients } = this.props;
    onInitIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  cancelPurchase = () => {
    this.setState({ purchasing: false });
  }

  continuePurchase = () => {
    const { onPurchaseInit } = this.props;
    onPurchaseInit();
    this.props.history.push('/checkout');

  }


  updatePurchaseState(ingredients) {

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    const finalPrice = sum.toFixed(2);
    return (finalPrice > 0);
  }

  render() {
    const { ingredients, onAddIngredients, onRemoveIngredients, totalPrice, error, isAuthenticated } = this.props;
    const disabledInfo = {
      ...ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const disabledIncreaseInfo = {
      ...ingredients
    }
    for (let key in disabledIncreaseInfo) {
      disabledIncreaseInfo[key] = disabledIncreaseInfo[key] >= 3;
    }
    let orderSummary = null;

    let burger = error ? <p>ingredients can't be loaded</p> : <Spinner />;
    if (ingredients) {
      burger = (<Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredient={onAddIngredients}
          removeIngredient={onRemoveIngredients}
          disabled={disabledInfo}
          disableIncrease={disabledIncreaseInfo}
          price={totalPrice.toFixed(2)}
          ordered={this.purchaseHandler}
          purchasable={this.updatePurchaseState(ingredients)}
          isAuth={isAuthenticated}
        />
      </Aux>);
      orderSummary = <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={this.cancelPurchase}
        purchaseContinued={this.continuePurchase}
        totalPrice={totalPrice}
      />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchase}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: ingName => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onRemoveIngredients: ingName => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onPurchaseInit: () => dispatch(orderActions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(authActions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));