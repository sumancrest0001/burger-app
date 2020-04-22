import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.module.css';
import Burgeringredient from './Burgeringredient/Burgeringredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <Burgeringredient key={igKey + i} type={igKey} />
      });
    }).reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <Burgeringredient type='bread-top'></Burgeringredient>
      {transformedIngredients}
      <Burgeringredient type='bread-bottom'></Burgeringredient>

    </div>
  );
};

export default withRouter(burger);