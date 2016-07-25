import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Message from './Message.react';

class MessageList extends React.Component {
  constructor() {
    super();
    this._handleScroll = this._handleScroll.bind(this);
  }

  componentWillUpdate() {
    // Before we re-render, see if the user manually scrolled back, we do not
    // want to force them back down to the bottom
    const node = findDOMNode(this);
    this.shouldScrollBottom = (
      (node.scrollTop + node.offsetHeight) === node.scrollHeight
    );
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      // Stay scrolled at the bottom since new messages will be appended
      const node = findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  _handleScroll(e) {
    const node = findDOMNode(this);

    // scrollTop == 0 indicates element not scrollable. We start paging
    // when <100 (magically picked) from the top
    if (node.scrollTop > 0 && node.scrollTop == 1) { // < 100
      // TODO Don't handle if already requesting
      // console.log(node.scrollHeight, node.scrollTop, node.offsetHeight);
      //console.log(this.props)
      this.props.handleMessageScroll(this.props.room, this.props.messages);
    }
  }

  render() {
    return (
      <div className="message-list" onScroll={this._handleScroll}>
        {this.props.messages.map(message =>
          <Message key={message.id} {...message} />
         )}
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    roomId: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  handleMessageScroll: PropTypes.func.isRequired,
};

export default MessageList;
