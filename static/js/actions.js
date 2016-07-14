import ActionTypes from './constants';


export const selectRoom = (room) => {
  return {
    type: ActionTypes.SELECT_ROOM,
    room,
  };
};
