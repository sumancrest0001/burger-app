import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('[OrderSummary.js] componentWillUpdate...');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey} ><span style={{ textTransform: 'capitalize' }}>{igKey}:</span> {this.props.ingredients[igKey]}</li>
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Total Price: <strong>{this.props.totalPrice}</strong></p>
        <Button type='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button type='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux >
    );
  }
}

export default OrderSummary;
