import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Login from '../Login.react';

describe('<Login />', () => {
  it('renders form', () => {
    const onUserChange = sinon.spy();
    const wrapper = shallow(
      <Login onUserChange={onUserChange} />
    );

    expect(wrapper.find('input').hasClass('form-control')).to.equal(true);
  });

  it('handles on submit and clears text', () => {
    const onUserChange = sinon.spy();
    // use mount() to expose the ref input
    const wrapper = mount(
      <Login onUserChange={onUserChange} />
    );

    const input = wrapper.find('input');
    input.node.value = 'Hello bob';
    input.simulate('change', input);

    wrapper.find('form').simulate('submit');
    // handler called
    expect(onUserChange).to.have.property('callCount', 1);
    expect(onUserChange.calledWith('Hello bob')).to.be.equal(true);

    // <input> value cleared out
    expect(input.get(0).value).to.equal('');
  });

  it('ignores empty input', () => {
    const onUserChange = sinon.spy();
    // use mount() to expose the ref input
    const wrapper = mount(
      <Login onUserChange={onUserChange} />
    );

    wrapper.find('form').simulate('submit');
    expect(onUserChange).to.have.property('callCount', 0);
  });
});
