import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import RoomList from '../RoomList.react';
import Room from '../Room.react';


describe('<RoomList />', () => {
  const rooms = [
    { id: 2, name: 'ted', active: false },
    { id: 3, name: 'alic', active: true },
  ];

  it('renders two <Room />', () => {
    const wrapper = shallow(
      <RoomList rooms={rooms} />
    );

    expect(wrapper.find('ul').hasClass('room-list')).to.equal(true);
    expect(wrapper.find(Room)).to.have.length(2);
  });
});
