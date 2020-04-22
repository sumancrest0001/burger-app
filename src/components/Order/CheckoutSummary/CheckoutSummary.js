import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well !!</h1>
      <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        type="Danger"
        clicked={props.checkoutCancelled}
      >
        CANCEL
      </Button>
      <Button type="Success"
        clicked={props.checkoutContinued}
      >
        SUCCESS
      </Button>
    </div >
  );
};

export default checkoutSummary;
