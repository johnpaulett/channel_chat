import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
  LOGIN: null,
  SELECT_ROOM: null,
  SEND_MESSAGE: null,
  REQUEST_MESSAGES: null,
  RECEIVE_MESSAGES: null,
});

export default ActionTypes;
