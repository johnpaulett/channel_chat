import React, { PropTypes } from 'react';
import MessageList from './MessageList.react';
import Author from './Author.react';


const ChatRoom = ({ room, messages }) => (
  <div>
    <h3>
      @{room}
    </h3>
    <MessageList messages={messages} />
    <Author />
  </div>
);

//TODO propTypes

export default ChatRoom;
