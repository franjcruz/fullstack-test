import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Requerido';
  }

  return errors;
};

const renderFieldInputGroup = ({
  input: { onChange, ...resInput },
  label,
  placeholder,
  type,
  className,
  onChangeValue,
  meta: { touched, dirty, error, warning }
}) => (
  <div>
    <div className="row">
      <div className="input-group mb-3">
        <input
          {...resInput}
          placeholder={placeholder}
          type={type}
          className={className}
          onChange={event => {
            onChange(event);
            if (onChangeValue) {
              onChangeValue(event);
            }
          }}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">
            Añadir
          </button>
        </div>
      </div>
    </div>
    {(touched || dirty) &&
      ((error && (
        <div className="col-md-12 has-error">
          <span className="help-block">{error}</span>
        </div>
      )) ||
        (warning && (
          <div className="col-md-12 has-warning">
            <span className="help-block">{warning}</span>
          </div>
        )))}
  </div>
);

const ItemForm = props => {
  const { handleSubmit } = props;

  return (
    <div>
      <h3>Crear</h3>
      <form onSubmit={handleSubmit}>
        <div className="col-12">
          <Field className="form-control" name="title" placeholder="Task" component={renderFieldInputGroup} />
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'itemForm',
  validate,
  enableReinitialize: true
})(ItemForm);
