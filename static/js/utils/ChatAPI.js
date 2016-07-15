
// TODO Consider re-implementing ChatAPI as a class, instead of using a
// module-level global
// FIXME on error / reconnect
let _socket = null;

export const ChatAPI = {
  connect: () => {
    // Use wss:// if running on https://
    const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${scheme}://${window.location.host}/chat`;
    _socket = new WebSocket(url);
  },

  listen: (dispatch) => {
    _socket.onmessage = (event) => {
      /* We cheat a little bit by using the Redux-style Actions as our
       * communication protocol with the server. This hack allows
       * the server to directly act as a Action Creator, which we
       * simply `dispatch()`.  Consider separating communication format
       * from client-side action API.
       */
      const action = JSON.parse(event.data);
      dispatch(action);
    };
  },

  send: (action) => {
    _socket.send(JSON.stringify(action));
  },
};

//const api = new ChatAPI();
//export default ChatAPI;
