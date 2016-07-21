import React, { PropTypes } from 'react';

const RoomItem = ({ name, open, active, onClick }) => (
  <li className="room" onClick={onClick} style={{ fontWeight: open ? 'bold' : 'normal' }}>
    <span className="glyphicon glyphicon-user text-muted"></span>
    {name}
  </li>
);

RoomItem.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  // active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RoomItem;
