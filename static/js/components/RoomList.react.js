import React, { PropTypes } from 'react';
import Room from './Room.react';


const RoomList = ({ rooms, onRoomClick }) => (
  <div>
    <h3>Rooms</h3>
    <ul className="room-list">
      {rooms.map(room =>
        <Room key={room.id} {...room} onClick={() => onRoomClick(room.name)} />
       )}
    </ul>
  </div>
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
