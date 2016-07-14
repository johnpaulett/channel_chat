import ActionTypes from './constants';

export const loginUser = (user) => {
  return {
    type: ActionTypes.LOGIN,
    user,
  };
};

export const selectRoom = (room) => {
  return {
    type: ActionTypes.SELECT_ROOM,
    room,
  };
};
