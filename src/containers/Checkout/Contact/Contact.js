import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './Contact.module.css';

class Contact extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Suman Shrestha',
        address: {
          street: 'Nahala 2',
          zipCode: '33914',
          country: 'Nepal'
        },
        email: 'suman.crest0001@gmail.com',
      },
      deliveryMethod: 'fastest',
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error =>
        this.setState({ loading: false })
      );

  };

  render() {

    let form = (
      <form>
        <Input inputtype="input" type="text" name="name" placeholder="Your name" />
        <Input inputtype="input" type="email" name="email" placeholder="Your email" />
        <Input inputtype="input" type="text" name="street" placeholder="Your street" />
        <Input inputtype="input" type="text" name="postal" placeholder="Your postal code" />
        <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.Contact}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default Contact;