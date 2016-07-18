import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
  LOGIN: null,
  LOGIN_SUCCESS: null,
  SELECT_ROOM: null,
  SEND_MESSAGE: null,
  REQUEST_MESSAGES: null,
  RECEIVE_MESSAGES: null,
  RECEIVE_ROOMS: null,
});

export default ActionTypes;
