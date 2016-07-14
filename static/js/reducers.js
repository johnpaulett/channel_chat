const initialState = {
  currentUser: 'bob',
  currentRoom: 'alice',
  rooms: [],
  messages: [],
};


function chatApp(state = initialState, action) {
  switch (action.type) {
    // TODO Handle actions to transform state
    // case ACTION_TYPE:
    //   return Object.assign({}, state, { ... });
    default:
      return state;
  }
}

export default chatApp;
