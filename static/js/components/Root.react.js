import React from 'react';
import Login from './Login.react';
import ChatApp from './ChatApp.react';


class Root extends React.Component {

  render() {
    return (
      <div className="container">
        <Login />
        <ChatApp />
      </div>
    );
  }
}


/*
App.propTypes = {
  id: PropTypes.number.isRequired,
};
 */

export default Root;
