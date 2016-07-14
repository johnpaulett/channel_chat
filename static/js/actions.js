import ActionTypes from './constants';

export const loginUser = (user) => ({
  type: ActionTypes.LOGIN,
  user,
});


export const selectRoom = (room) => ({
  type: ActionTypes.SELECT_ROOM,
  room,
});
