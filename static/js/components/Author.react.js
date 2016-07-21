import React, { PropTypes } from 'react';

const Author = ({ onSendMessage }) => {
  let input;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }

    onSendMessage(input.value);

    // clear out the text box
    input.value = '';
  };

  const setInput = (node) => {
    input = node;
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="input-group">
        <input type="text" autoFocus="autofocus" className="form-control" ref={setInput} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-primary">send</button>
        </span>
      </div>
    </form>
  );
};

Author.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};


export default Author;
