import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

import { createItem, listItem, logout } from '../actions/Actions';
import AppFrame from '../components/globals/AppFrame';
import ItemList from '../components/ItemList';

class ItemListContainer extends Component {
  async componentDidMount() {
    // Solo disponible estando logado
    // Esta comprobación la suelo hacer usando interceptores, pero dado que es una prueba simple de un par de rutas he optado por esto
    if (this.props.auth && this.props.auth.token && this.props.auth.token.access_token) {
      try {
        return await this.props.listItem();
      } catch (error) {
        // Capturar errores (por ejemplo, el token ha expirado)
        return this.logout();
      }
    } else {
      this.props.history.push('/login');
    }
  }

  logout = () => {
    this.props.logout();
    localStorage.removeItem('jwtToken');
    this.props.history.push('/login');
  };

  handleSubmit = async values => {
    try {
      await this.props.createItem(values);
      return await this.props.listItem();
    } catch (error) {
      // Sino tiene permiso para crear...
      swal({
        title: 'Error',
        text: 'No tienes permiso para ejecutar esta acción.',
        icon: 'error'
      });
    }
  };

  render() {
    const { listItem } = this.props.item;

    return <AppFrame body={<ItemList onFormSubmit={this.handleSubmit} logout={this.logout} listItem={listItem} />} />;
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { createItem, listItem, logout }
  )(ItemListContainer)
);
