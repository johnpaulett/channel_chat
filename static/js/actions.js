import ActionTypes from './constants';
import { ChatAPI } from './utils/ChatAPI';

export function loginUser(user) {
  return () => {
    ChatAPI.send({
      type: ActionTypes.LOGIN,
      user,
    });
  };
}

export function reqestMessages(room) {
  // TODO Don't need to do this if room's messages exist in state.
  ChatAPI.send({
    type: ActionTypes.REQUEST_MESSAGES,
    roomId: room.id,
  });
}

export function selectRoom(room) {
  return (dispatch, getState) => {
    // Ask the server for the messages for the current room.
    reqestMessages(room);

    // Re-dispatch so the state gets a new currenRoomId
    dispatch({
      type: ActionTypes.SELECT_ROOM,
      room,
    });
  };
}

// thunk returns a function for evaluation by middleware
export function sendMessage(roomId, content) {
  return () => {
    ChatAPI.send({
      type: ActionTypes.SEND_MESSAGE,
      roomId,
      content,
    });
  };
}
