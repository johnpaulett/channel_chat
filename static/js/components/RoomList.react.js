import React, { PropTypes } from 'react';
import Room from './Room.react';


const RoomList = ({ rooms, onRoomClick }) => (
  <ul>
    {rooms.map(room =>
      <Room key={room.id} {...room} onClick={() => onRoomClick(room.name)} />
     )}
  </ul>
);

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  onRoomClick: PropTypes.func.isRequired,
};

export default RoomList;
