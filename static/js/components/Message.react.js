import React, { PropTypes } from 'react';

const Message = ({ user, content, timestamp }) => {
  const date = new Date(timestamp);
  return (
    <div className="message">
      <span className="user">{user}:</span>
      <span className="content">{content}</span>
      <span className="timestamp">
        {date.toISOString()}
      </span>
    </div>
  );
};

Message.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Message;
