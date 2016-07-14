import React from 'react';

const Login = ({ onHandleChange }) => (
  <div className="row">
    <div className="col-md-8 col-md-push-2">
      <form className="form-inline" onSubmit={onHandleChange}>
        <input type="text" className="form-control" placeholder="handle" />
        <button type="submit" className="btn btn-primary">go!</button>
      </form>
    </div>
  </div>
);

export default Login;
