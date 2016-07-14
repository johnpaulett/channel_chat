import React, { PropTypes } from 'react';
import MessageList from './MessageList.react';
import Author from './Author.react';


const ChatRoom = ({ room, messages }) => (
  <div>
    <div>
      {room}
    </div>
    <MessageList messages={messages} />
    <Author />
  </div>
);

//TODO propTypes

export default ChatRoom;
