import React, { PropTypes } from 'react';
import MessageList from './MessageList.react';
import Author from './Author.react';


class ChatRoom extends React.Component {
  constructor() {
    super();
    this._handleSendMessage = this._handleSendMessage.bind(this);
  }

  _handleSendMessage(content) {
    return this.props.handleSendMessage(this.props.room, content);
  }

  render() {
    return (
      <div>
        <h3 className="room-name">@{this.props.room}</h3>
        <MessageList messages={this.props.messages} />
        <Author onSendMessage={this._handleSendMessage} />
      </div>
    );
  }
}

ChatRoom.propTypes = {
  room: PropTypes.string.isRequired,
  messages: PropTypes.array,
  handleSendMessage: PropTypes.func.isRequired,
};

export default ChatRoom;
