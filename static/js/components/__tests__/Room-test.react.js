import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Room from '../Room.react';


describe('<Room />', () => {
  it('renders content', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(
      <Room name="bob" active={true} onClick={onClick} />
    );

    expect(wrapper.hasClass('room')).to.equal(true);
    expect(wrapper.find('.room').text()).to.equal('@bob');
  });

  it('handles click', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(
      <Room name="bob" active={true} onClick={onClick} />
    );
    wrapper.find('.room').simulate('click');

    expect(onClick).to.have.property('callCount', 1);
  });
});
