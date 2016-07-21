import React, { PropTypes } from 'react';
import dateFormat from 'dateformat';


const Message = ({ user, content, timestamp }) => {
  // Server returns normal unix timestamp in seconds, but Javascript
  // uses milliseconds
  const date = new Date(timestamp * 1000);
  return (
    <div className="message">
      <span className="user">{user}:</span>
      <span className="content">{content}</span>
      <span className="timestamp">
        {dateFormat(date, 'mmmm dS, h:MM TT')}
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
