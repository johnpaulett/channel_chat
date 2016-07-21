import ReconnectingWebSocket from 'shopify-reconnecting-websocket';
import ActionTypes from '../constants';
import _ from 'lodash';


const receiveSocketMessage = (dispatch, action) => {
  /* We cheat by using the Redux-style Actions as our
   * communication protocol with the server. This hack allows
   * the server to directly act as a Action Creator, which we
   * simply `dispatch()`.  Consider separating communication format
   * from client-side action API.
   */
  switch (action.type) {

    case ActionTypes.RECEIVE_MESSAGES:
    default:
      return dispatch(action);
  }
};

const reconnect = (state) => {
  // TODO loginUser did not work because of circular import -- refactor
  ChatAPI.send({
    type: ActionTypes.LOGIN,
    user: state.currentUser,
  });

  // TODO Delay the REQUEST_MESSAGES until after the LOGIN returns
  // Ensure we did not miss any messages
  const lastMessage = _.maxBy(state.messages, (m) => m.id);
  ChatAPI.send({
    type: ActionTypes.REQUEST_MESSAGES,
    lastMessageId: typeof lastMessage === 'undefined' ? 0 : lastMessage.id,
    user: state.currentUser,
  });
};


// TODO Consider re-implementing ChatAPI as a class, instead of using a
// module-level global
// FIXME on error / reconnect
let _socket = null;

export const ChatAPI = {
  connect: () => {
    // Use wss:// if running on https://
    const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${scheme}://${window.location.host}/chat`;
    _socket = new ReconnectingWebSocket(url);
  },

  listen: (store) => {
    _socket.onmessage = (event) => {
      const action = JSON.parse(event.data);
      receiveSocketMessage(store.dispatch, action);
    };

    _socket.onopen = () => {
      const state = store.getState();

      // On Reconnect, need to re-login, so the channel_session['user']
      // is populated
      if (state.currentUser !== null) {
        reconnect(state);
      }
    };
  },

  send: (action) => {
    _socket.send(JSON.stringify(action));
  },
};

//const api = new ChatAPI();
//export default ChatAPI;
