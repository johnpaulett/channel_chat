import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import Login from '../components/Login.react';
import ChatApp from '../components/ChatApp.react';


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


const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleChange: (user) => {
    console.log(user);
    dispatch(loginUser(user));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
