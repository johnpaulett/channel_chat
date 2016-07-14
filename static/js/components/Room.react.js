import React, { PropTypes } from 'react';

const RoomItem = ({ name, active, onClick }) => (
  <li onClick={onClick} style={{ fontWeight: active ? 'bold' : 'normal' }}>
    {name}
  </li>
);

RoomItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RoomItem;
