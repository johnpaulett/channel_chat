import React, { PropTypes } from 'react';
import Message from './Message.react';


const MessageList = ({ messages }) => (
  <div>
    {messages.map(message =>
      <Message key={message.id} {...message} />
     )}
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    room: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired, //TODO date not object
  }).isRequired).isRequired,
};

export default MessageList;
