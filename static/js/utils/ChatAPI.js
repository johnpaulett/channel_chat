

class ChatAPI {
  constructor() {
    // Use wss:// if running on https://
    const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${scheme}://${window.location.host}/chat`;
    this.socket = new WebSocket(url);
  }

  listen() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // TODO Handle message
    };
  }

  send(action) {
    this.socket.send(JSON.stringify(action));
  }
}

// FIXME on error / reconnect
const api = new ChatAPI();

export default api;
