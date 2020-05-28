import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/auth';
import classes from './Auth.module.css';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },

      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
      },
    },
    isSignup: true,
  }

  componentDidMount() {
    const { buildingBurger, onSetAuthRedirectPath, authRedirectPath } = this.props;
    if (!buildingBurger && authRedirectPath) {
      onSetAuthRedirectPath('/')
    }
  }

  checkValidity = (input, value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (input !== 'select') {
      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }
      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    };
    this.setState({ controls: updatedControls });
  }

  submitHandler = event => {
    const { onAuth } = this.props;
    const { email, password } = this.state.controls;
    const { isSignup } = this.state;
    event.preventDefault();
    onAuth(email.value, password.value, isSignup);

  }
  switchAuthModelHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  }

  render() {
    const { isSignup } = this.state;
    const { loadingStatus, error, isAuthenticated, authRedirectPath } = this.props;
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.value}
        invalid={!formElement.config.valid}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    if (loadingStatus) {
      form = <Spinner />;
    }

    let authRedirect = !isAuthenticated ? null : <Redirect to={authRedirectPath} />;

    const errorMessage = error ? <div>{error.message}</div> : null;

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="Success">SUBMIT</Button>
        </form>
        <Button
          type="Danger"
          clicked={this.switchAuthModelHandler}
        >SWITCH TO {isSignup ? 'SIGNIN' : 'SIGHUP'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingStatus: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);