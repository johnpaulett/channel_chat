import ActionTypes from './constants';
import _ from 'lodash';


const initialState = {
  currentUser: null,
  currentRoomId: null,
  rooms: [
    /* { id: 1, name: 'alice', active: true },
    { id: 2, name: 'bob', active: true },
    { id: 3, name: 'eve', active: false },
    { id: 4, name: 'grace', active: false },
    */
  ],
  messages: [
    /*
    { id: 1, content: 'hello world', user: 'alice', roomId: 1,
       timestamp: Date.now()/1000 },
    { id: 2, content: 'Hey!', user: 'bob', roomId: 1,
       timestamp: Date.now()/1000 },
    { id: 3, content: 'Welcome Bob', user: 'bob', roomId: 4,
       timestamp: Date.now()/1000 },
     */
  ],
};


function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_MESSAGES:
      // Ensure no duplicate messages
      const messages = _.unionWith(
        state.messages,
        action.messages,
        (x, y) => x.id === y.id
      );
      // Enforce sort order (future operations assume ASC order of
      // state.messages)
      // TODO Consider a smarter algorithm than _.unionWith().sort(),
      // perhaps a Merge Sort since state.messages will already be sorted.
      messages.sort(
        (x, y) => x.id - y.id  // x.timestamp - y.timestamp
      );

      return Object.assign({}, state, {
        messages,
      });

    case ActionTypes.RECEIVE_ROOMS:
      return Object.assign({}, state, {
        rooms: action.rooms,
      });

    case ActionTypes.SELECT_ROOM:
      return Object.assign({}, state, {
        currentRoomId: action.room.id,
      });

    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.user,
      });
    default:
      return state;
  }
}

export default reducer;
