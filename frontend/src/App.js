import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import ItemListContainer from './containers/ItemListContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ItemListContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/register" component={RegisterContainer} />

          <Route path="/" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  null,
  {}
)(App);
