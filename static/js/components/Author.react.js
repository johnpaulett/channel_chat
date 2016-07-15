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
    <form className="form-inline" onSubmit={handleSendMessage}>
      <input type="text" className="form-control" ref={setInput} />
      <button type="submit" className="btn btn-primary">send</button>
    </form>
  );
};

Author.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};


export default Author;
