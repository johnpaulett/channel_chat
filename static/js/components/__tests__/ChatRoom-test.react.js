import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import { sampleMessages } from './utils';

import Author from '../Author.react';
import ChatRoom from '../ChatRoom.react';
import MessageList from '../MessageList.react';


describe('<ChatRoom />', () => {
  it('renders room name', () => {
    const wrapper = shallow(
      <ChatRoom room="ted" />
    );
    expect(wrapper.find('.room-name').text()).to.equal('@ted');
  });

  it('renders <MessageList /> and <Author />', () => {
    const wrapper = mount(
      <ChatRoom room="ted" messages={sampleMessages} />
    );
    expect(wrapper.find(Author)).to.have.length(1);
    expect(wrapper.find(MessageList)).to.have.length(1);
  });
});
