import React from 'react';
import classes from './Order.module.css';


const order = (props) => {
  const ingredientsArray = (ingredients) => {
    const ingredientStringArray = [];
    const entries = Object.entries(ingredients);
    for (const [ingredient, count] of entries) {
      ingredientStringArray.push({
        name: ingredient,
        amount: count,
      });
    }
    console.log(ingredientStringArray);
    return ingredientStringArray;
  };
  const arr = ingredientsArray(props.ingredients)
  return (
    <div className={classes.Order}>
      <ul>
        {
          arr.map(item =>
            <li key={item.name}>{item.name}: {item.amount}</li>
          )
        }
      </ul>
      <p>Price: <strong>{props.price}</strong></p>
    </div>
  );
};

export default order;
