import React, { PropTypes } from 'react';

const Login = ({ onUserChange }) => {
  let input;

  const handleUserChange = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }

    onUserChange(input.value);

    // clear out the text box
    input.value = '';
  };

  const setInput = (node) => {
    input = node;
  };

  return (
    <div className="row">
      <div className="col-md-4 col-md-push-4">
        <form className="login-form" onSubmit={handleUserChange}>
          <div className="input-group">
            <input type="text" autoFocus="autofocus" className="form-control" placeholder="handle" ref={setInput} />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary">login</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};


Login.propTypes = {
  onUserChange: PropTypes.func.isRequired,
};

export default Login;
