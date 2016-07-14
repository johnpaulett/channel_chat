import React from 'react';
import ActiveRoomList from '../containers/ActiveRoomList.react';
import VisibleChatRoom from '../containers/VisibleChatRoom.react';


const ChatApp = () => (
  <div className="row">
    <div className="col-md-8">
      <VisibleChatRoom />
    </div>
    <div className="col-md-4">
      <ActiveRoomList />
    </div>
  </div>
);

export default ChatApp;
