import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import * as authActions from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.checkAutoSignup();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkAutoSignup: () => dispatch(authActions.authCheckState()),
  };
};


export default connect(null, mapDispatchToProps)(App);
