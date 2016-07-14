import React, { PropTypes } from 'react';

const Message = ({ user, content, date }) => (
  <div>
    {user}:
    {content}
    <span>{date}</span>
  </div>
);

Message.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired, //TODO date not object
};

export default Message;
