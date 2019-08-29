import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Requerido';
  }

  if (!values.password) {
    errors.password = 'Requerido';
  }

  return errors;
};

const InputTextField = ({
  input,
  label,
  placeholder,
  type,
  className,
  divClassName,
  divClassNameWarning,
  divClassNameError,
  disabled,
  id,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="form-group">
      <div className="row">
        <div className={`col-12 ${divClassName}`}>
          <label className="control-label">{label}</label>
        </div>
      </div>
      <div className="row">
        <div className={`col-12 ${divClassName}`}>
          <input id={id} {...input} placeholder={placeholder} type={type} className={className} disabled={disabled} />
        </div>
      </div>
      {touched &&
        ((error && (
          <div className={`col-12 has-error ${divClassNameError}`}>
            <span className="help-block">{error}</span>
          </div>
        )) ||
          (warning && (
            <div className={`col-12 has-warning ${divClassNameWarning}`}>
              <span className="help-block">{warning}</span>
            </div>
          )))}
    </div>
  );
};

const LoginForm = props => {
  const { handleSubmit, submitting, pristine } = props;

  return (
    <div className="container register-container">
      <form className="form-horizontal bordered-row" onSubmit={handleSubmit}>
        <div className="panel">
          <div className="panel-body">
            <h3 className="title-hero">Iniciar sesión</h3>
            <div className="example-box-wrapper">
              <div className="row">
                <div className="col-md-12">
                  <Field className="form-control" label="Email" name="email" component={InputTextField} type="text" placeholder="Email" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Field
                    className="form-control"
                    label="Contraseña"
                    name="password"
                    component={InputTextField}
                    type="password"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="panel">
          <div className="panel-body">
            <div className="bg-default content-box text-center pad20A mrg25T">
              <Link to="/register" className="btn btn-lg btn-success">
                Crear cuenta
              </Link>
              &nbsp;&nbsp;
              <button type="submit" className="btn btn-lg btn-primary" disabled={pristine || submitting}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);
