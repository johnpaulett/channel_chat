import ActionTypes from './constants';
import { ChatAPI } from './utils/ChatAPI';
import _ from 'lodash';


export function loginUser(user) {
  return () => {
    ChatAPI.send({
      type: ActionTypes.LOGIN,
      user,
    });
  };
}

export function requestMessages(room) {
  // TODO Don't need to do this if room's messages exist in state.
  ChatAPI.send({
    type: ActionTypes.REQUEST_MESSAGES,
    roomId: room.id,
  });
}

export function requestPriorMessages(room, messages) {
  return () => {
    const firstMessage = _.minBy(messages, (m) => m.id);
    ChatAPI.send({
      type: ActionTypes.REQUEST_MESSAGES,
      firstMessageId: firstMessage.id,
      roomId: room.id,
    });
  };
}

export function selectRoom(room) {
  return (dispatch) => {
    // Ask the server for the messages for the current room.
    requestMessages(room);

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
