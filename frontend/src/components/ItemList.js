import _ from 'lodash';
import React from 'react';

import ItemForm from './ItemForm';

const Item = ({ item }) => {
  return (
    <li key={item._id} href="#" className="list-group-item">
      {item.title}
    </li>
  );
};

const ItemList = props => {
  const { onFormSubmit, listItem, logout } = props;

  return (
    <div>
      <div className="row">
        <div className="col-12" style={{ marginBottom: '20px' }}>
          <button
            onClick={() => {
              logout();
            }}
            className="float-right btn btn-secondary"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="panel">
        <div className="panel-body">
          <ItemForm onSubmit={onFormSubmit} />
        </div>
      </div>
      <div className="panel">
        <div className="panel-body">
          <h3>Lista</h3>
          {listItem && listItem instanceof Array && _.size(listItem) ? (
            <div className="list-group" style={{ marginTop: '30px' }}>
              {listItem.map(item => {
                return <Item key={item._id} item={item} />;
              })}
            </div>
          ) : (
            <div style={{ fontStyle: 'italic', textAlign: 'center' }}>
              <span>No existen registros</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
