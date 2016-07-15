import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Author from '../Author.react';

describe('<Author />', () => {
  it('renders form', () => {
    const onSendMessage = sinon.spy();
    const wrapper = shallow(
      <Author onSendMessage={onSendMessage} />
    );

    expect(wrapper.find('input').hasClass('form-control')).to.equal(true);
  });

  it('handles on submit and clears text', () => {
    const onSendMessage = sinon.spy();
    // use mount() to expose the ref input
    const wrapper = mount(
      <Author onSendMessage={onSendMessage} />
    );

    const input = wrapper.find('input');
    input.node.value = 'Hello bob';
    input.simulate('change', input);

    wrapper.find('form').simulate('submit');
    // handler called
    expect(onSendMessage).to.have.property('callCount', 1);
    expect(onSendMessage.calledWith('Hello bob')).to.be.equal(true);

    // <input> value cleared out
    expect(input.get(0).value).to.equal('');
  });

  it('ignores empty input', () => {
    const onSendMessage = sinon.spy();
    // use mount() to expose the ref input
    const wrapper = mount(
      <Author onSendMessage={onSendMessage} />
    );

    wrapper.find('form').simulate('submit');
    expect(onSendMessage).to.have.property('callCount', 0);
  });
});
