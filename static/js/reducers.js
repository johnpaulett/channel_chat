import ActionTypes from './constants';

const initialState = {
  currentUser: 'bob',
  currentRoom: 'alice',
  rooms: [
    { id: 1, name: 'alice', active: true },
    { id: 2, name: 'bob', active: true },
    { id: 3, name: 'eve', active: false },
    { id: 4, name: 'grace', active: false },
  ],
  messages: [
    { id: 1, content: 'hello world', user: 'alice', room: 'alice', timestamp: Date.now() },
    { id: 2, content: 'Hey!', user: 'bob', room: 'alice', timestamp: Date.now() },
    { id: 3, content: 'Welcome Bob', user: 'bob', room: 'grace', timestamp: Date.now() },
  ],
};


function chatApp(state = initialState, action) {
  switch (action.type) {
    // TODO Handle actions to transform state
    // case ACTION_TYPE:
    //   return Object.assign({}, state, { ... });
    case ActionTypes.SELECT_ROOM:
      return Object.assign({}, state, {
        currentRoom: action.room,
      });

    default:
      return state;
  }
}

export default chatApp;
