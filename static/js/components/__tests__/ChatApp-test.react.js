import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ChatApp from '../ChatApp.react';
import ActiveRoomList from '../../containers/ActiveRoomList.react';
import VisibleChatRoom from '../../containers/VisibleChatRoom.react';


describe('<ChatApp />', () => {
  it('renders <ChatRoom /> and <RoomList />', () => {
    const wrapper = shallow(
      <ChatApp />
    );
    expect(wrapper.find(ActiveRoomList)).to.have.length(1);
    expect(wrapper.find(VisibleChatRoom)).to.have.length(1);
  });
});
