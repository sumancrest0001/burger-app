import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = ({ isAuthenticated }) => {
  return (<ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {
      isAuthenticated
        ? (<>
          <NavigationItem link="/Orders">Order</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </>)
        : <NavigationItem link="/auth">Authenticate</NavigationItem>
    }
  </ul>);
};

export default navigationItems;