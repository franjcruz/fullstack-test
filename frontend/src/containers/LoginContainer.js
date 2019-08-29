import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { change, reset } from 'redux-form';
import { show } from 'redux-modal';
import swal from 'sweetalert';

import { loginUser } from '../actions/Actions';
import AppFrame from '../components/globals/AppFrame';
import LoginForm from '../components/LoginForm';

class LoginContainer extends Component {
  async componentDidMount() {
    // Solo disponible estando sin logar
    // Esta comprobación la suelo hacer usando interceptores, pero dado que es una prueba simple de un par de rutas he optado por esto
    if (this.props.auth && this.props.auth.token && this.props.auth.token.access_token) {
      this.props.history.push('/');
    }
  }

  handleSubmit = async values => {
    if (values) {
      let form = {
        email: values.email,
        password: values.password
      };
      return this.props
        .loginUser(form)
        .then(async r => {
          localStorage.setItem('jwtToken', r.payload.access_token);
          this.props.reset('loginForm');
          this.props.history.push('/');
        })
        .catch(err => {
          console.log('err :', err);
          swal({
            title: 'Error',
            text: err.message,
            icon: 'error'
          });
        });
    }
  };

  render() {
    return <AppFrame body={<LoginForm onSubmit={this.handleSubmit} />} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { change, show, reset, loginUser }
  )(LoginContainer)
);
