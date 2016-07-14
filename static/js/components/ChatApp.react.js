import React from 'react';
import ActiveRoomList from '../containers/ActiveRoomList.react';
import VisibleChatRoom from '../containers/VisibleChatRoom.react';


const ChatApp = () => (
  <div className="row">
    <div className="col-md-9">
      <VisibleChatRoom />
    </div>
    <div className="col-md-3">
      <ActiveRoomList />
    </div>
  </div>
);

export default ChatApp;
