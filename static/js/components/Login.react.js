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
      <div className="col-md-8 col-md-push-2">
        <form className="form-inline" onSubmit={handleUserChange}>
          <input type="text" className="form-control" placeholder="handle" ref={setInput} />
          <button type="submit" className="btn btn-primary">login</button>
        </form>
      </div>
    </div>
  );
};


Login.propTypes = {
  onUserChange: PropTypes.func.isRequired,
};

export default Login;
