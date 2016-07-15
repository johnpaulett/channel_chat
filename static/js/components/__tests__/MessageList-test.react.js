import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { sampleMessages } from './utils';

import MessageList from '../MessageList.react';
import Message from '../Message.react';


describe('<MessageList />', () => {
  it('renders two <Message />', () => {
    const wrapper = shallow(
      <MessageList messages={sampleMessages} />
    );

    expect(wrapper.hasClass('message-list')).to.equal(true);
    expect(wrapper.find(Message)).to.have.length(2);
  });
});
