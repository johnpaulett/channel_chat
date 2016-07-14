//TODO MOVE to ../containers

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import Login from './Login.react';
import ChatApp from './ChatApp.react';


class Root extends React.Component {

  render() {
    const content = this.props.currentUser === null ? <Login onHandleChange={this.props.onHandleChange} /> : <ChatApp />;
    return (
      <div className="container">
        {content}
      </div>
    );
  }
}

Root.propTypes = {
  currentUser: PropTypes.string,
};


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleChange: (user) => {
      console.log(user)
      dispatch(loginUser(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
