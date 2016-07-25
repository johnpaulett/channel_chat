import React, { PropTypes } from 'react';
import MessageList from './MessageList.react';
import Author from './Author.react';


class ChatRoom extends React.Component {
  constructor() {
    super();
    this._handleSendMessage = this._handleSendMessage.bind(this);
  }

  _handleSendMessage(content) {
    return this.props.handleSendMessage(this.props.room.id, content);
  }

  render() {
    if (typeof this.props.room === 'undefined') {
      return <div>Select Room</div>;
    }
    return (
      <div>
        <h3 className="room-name">@{this.props.room.name}</h3>
        <MessageList messages={this.props.messages} room={this.props.room}
                     handleMessageScroll={this.props.handleMessageScroll} />
        <Author onSendMessage={this._handleSendMessage} />
      </div>
    );
  }
}

ChatRoom.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  messages: PropTypes.array,
  handleSendMessage: PropTypes.func.isRequired,
  handleMessageScroll: PropTypes.func.isRequired,
};

export default ChatRoom;
