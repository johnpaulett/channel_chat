import { connect } from 'react-redux';
import { selectRoom } from '../actions';
import ChatRoom from '../components/ChatRoom.react';

const getVisibleMessages = (messages, room) => {
  return messages.filter(m => m.room === room);
};

const mapStateToProps = (state) => {
  return {
    room: state.currentRoom,
    messages: getVisibleMessages(state.messages, state.currentRoom),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthorClick: (id) => {
      dispatch(selectRoom(id));
    },
  };
};

const VisibleChatRoom = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);

export default VisibleChatRoom;
