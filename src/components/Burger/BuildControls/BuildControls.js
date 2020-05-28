import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {
  return <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price}</strong></p>
    {controls.map(ctrl => (
      <BuildControl key={ctrl.label}
        label={ctrl.label}
        added={() => props.addIngredient(ctrl.type)}
        removed={() => props.removeIngredient(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
        disabledIncrease={props.disableIncrease[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      onClick={props.ordered}
      disabled={!props.purchasable}
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO CONTINUE'}
    </button>
  </div>
};


export default buildControls;