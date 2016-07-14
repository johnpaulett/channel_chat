import { connect } from 'react-redux';
import { sendMessage } from '../actions';
import ChatRoom from '../components/ChatRoom.react';

const getVisibleMessages = (messages, room) => (
  messages.filter(m => m.room === room)
);

const mapStateToProps = (state) => ({
  room: state.currentRoom,
  messages: getVisibleMessages(state.messages, state.currentRoom),
});

const mapDispatchToProps = (dispatch) => ({
  onSendClick: (room, content) => {
    dispatch(sendMessage(room, content));
  },
});

const VisibleChatRoom = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);

export default VisibleChatRoom;
