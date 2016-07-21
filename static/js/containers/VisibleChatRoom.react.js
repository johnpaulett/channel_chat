import { connect } from 'react-redux';
import { sendMessage } from '../actions';
import ChatRoom from '../components/ChatRoom.react';

const getVisibleMessages = (messages, roomId) => (
  messages.filter(
    m => m.roomId === roomId
  ).sort(
    (a, b) => a.timestamp - b.timestamp
  )
);

const getRoom = (rooms, roomId) => (
  rooms.find(r => r.id === roomId)
);

const mapStateToProps = (state) => ({
  room: getRoom(state.rooms, state.currentRoomId),
  messages: getVisibleMessages(state.messages, state.currentRoomId),
});

const mapDispatchToProps = (dispatch) => ({
  handleSendMessage: (room, content) => {
    dispatch(sendMessage(room, content));
  },
});

const VisibleChatRoom = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);

export default VisibleChatRoom;
