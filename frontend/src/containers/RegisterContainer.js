import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { change, reset } from 'redux-form';
import { show } from 'redux-modal';
import swal from 'sweetalert';

import { registerNewUser } from '../actions/Actions';
import AppFrame from '../components/globals/AppFrame';
import RegisterForm from '../components/RegisterForm';

class RegisterContainer extends Component {
  async componentDidMount() {
    // Solo disponible estando sin logar
    // Esta comprobación la suelo hacer usando interceptores, pero dado que es una prueba simple de un par de rutas he optado por esto
    if (this.props.auth && this.props.auth.token && this.props.auth.token.access_token) {
      this.props.history.push('/');
    }
  }

  handleSubmit = values => {
    let body = {
      email: values.email,
      password: values.password,
      role: values.role
    };

    return this.props
      .registerNewUser(body)
      .then(r => {
        this.props.reset('registerForm');
        swal({
          title: 'Registro',
          text: 'El registro se realizó correctamente.',
          icon: 'success'
        }).then(async () => {
          this.props.history.push('/');
        });
      })
      .catch(err => {
        swal({
          title: 'Error',
          text: err.message,
          icon: 'error'
        });
      });
  };

  render() {
    return <AppFrame body={<RegisterForm onSubmit={this.handleSubmit} />} />;
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { change, show, reset, registerNewUser }
  )(RegisterContainer)
);
