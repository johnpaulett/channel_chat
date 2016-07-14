import React, { PropTypes } from 'react';

const RoomItem = ({ name, active, onClick }) => (
  <li className="room" onClick={onClick} style={{ fontWeight: active ? 'bold' : 'normal' }}>
    <span className="glyphicon glyphicon-user"></span>
    @{name}
  </li>
);

RoomItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RoomItem;
