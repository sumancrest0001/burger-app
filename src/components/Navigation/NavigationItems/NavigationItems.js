import React from 'react';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  return (<ul className={classes.NavigationItems}>
    <li className={classes.NavigationItem}>
      <a href={props.link} className={props.active ? classes.active : null}>A Link</a>
    </li>
    <li className={classes.NavigationItem}>
      <a href={props.link} className={props.active ? classes.active : null}>A Link</a>
    </li>
  </ul>);
};

export default navigationItems;