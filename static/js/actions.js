import ActionTypes from './constants';
import api from './utils/ChatAPI';

export const loginUser = (user) => ({
  type: ActionTypes.LOGIN,
  user,
});


export const selectRoom = (room) => ({
  type: ActionTypes.SELECT_ROOM,
  room,
});


// thunk returns a function for evaluation by middleware
export function sendMessage(room, content) {
  return () => {
    api.send({
      type: ActionTypes.SEND_MESSAGE,
      room,
      content,
    });

    // let it know we're done
    return Promise.resolve();
  };
}
