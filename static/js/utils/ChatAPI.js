

class ChatAPI {
  constructor() {
    // Use wss:// if running on https://
    const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${scheme}://${window.location.host}/chat`;
    this.socket = new WebSocket(url);
  }

  listen(dispatch) {
    this.socket.onmessage = (event) => {
      /* We cheat a little bit by using the Redux-style Actions as our
       * communication protocol with the server. This hack allows
       * the server to directly act as a Action Creator, which we
       * simply `dispatch()`.  Consider separating communication format
       * from client-side action API.
       */
      const action = JSON.parse(event.data);
      dispatch(action);
    };
  }

  send(action) {
    this.socket.send(JSON.stringify(action));
  }
}

// FIXME on error / reconnect
const api = new ChatAPI();

export default api;
