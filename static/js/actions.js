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


export const selectRoom = (room) => ({
  type: ActionTypes.SELECT_ROOM,
  room,
});


// thunk returns a function for evaluation by middleware
export function sendMessage(room, content) {
  return () => {
    ChatAPI.send({
      type: ActionTypes.SEND_MESSAGE,
      room,
      content,
    });
  };
}
