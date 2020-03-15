import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1,
  bacon: 0.75,
  cheese: 0.5,
}

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0,
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
    }
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  cancelPurchase = () => {
    this.setState({ purchasing: false });
  }

  continuePurchase = () => {
    alert("Continue purchasing.......");
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
    this.setState({ purchasable: finalPrice > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);

  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const disabledIncreaseInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledIncreaseInfo) {
      disabledIncreaseInfo[key] = disabledIncreaseInfo[key] >= 3;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchase}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.cancelPurchase}
            purchaseContinued={this.continuePurchase}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          disableIncrease={disabledIncreaseInfo}
          price={this.state.totalPrice.toFixed(2)}
          ordered={this.purchaseHandler}
          purchasable={this.state.purchasable} />
      </Aux>
    );
  }
}

export default BurgerBuilder;