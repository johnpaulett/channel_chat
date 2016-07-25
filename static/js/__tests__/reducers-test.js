import { expect } from 'chai';

import reducer from '../reducers';
import ActionTypes from '../constants';


describe('reducer', () => {
  const initialState = {
    currentUser: null,
    currentRoomId: null,
    rooms: [],
    messages: [],
  };

  describe('RECEIVE_MESSAGES', () => {
    it('should set messages', () => {
      const messages = [
        { id: 5, content: 'a' },
        { id: 7, content: 'b' },
        { id: 8, content: 'c' },
        { id: 6, content: 'd' },
      ];
      const action = {
        type: ActionTypes.RECEIVE_MESSAGES,
        messages,
      };

      const state = reducer(undefined, action);
      expect(state.messages).to.deep.equal(messages);
    });

    it('should merge with existing messages', () => {
      const messages = [
        { id: 5, content: 'a' },
        { id: 7, content: 'b' },
        { id: 8, content: 'c' },
        { id: 6, content: 'd' },
      ];
      const action = {
        type: ActionTypes.RECEIVE_MESSAGES,
        messages,
      };

      initialState.messages = [
        { id: 4, content: 'x' },
        { id: 5, content: 'y' },
      ];

      const state = reducer(initialState, action);
      expect(state.messages).to.deep.equal([
        { id: 4, content: 'x' },
        { id: 5, content: 'y' },
        { id: 7, content: 'b' },
        { id: 8, content: 'c' },
        { id: 6, content: 'd' },
      ]);
    });
  });

  describe('RECEIVE_ROOMS', () => {
    it('when unset should set rooms and current room', () => {
      const rooms = [
        { id: 5, name: 'a' },
        { id: 7, name: 'b' },
        { id: 8, name: 'c' },
        { id: 6, name: 'd' },
      ];
      const action = {
        type: ActionTypes.RECEIVE_ROOMS,
        rooms,
      };

      const state = reducer(undefined, action);
      expect(state.rooms).to.deep.equal(rooms);
      // defaults to first room
      expect(state.currentRoomId).to.be.equal(5);
    });

    it('when set should only set rooms', () => {
      const rooms = [
        { id: 5, name: 'a' },
        { id: 7, name: 'b' },
        { id: 8, name: 'c' },
        { id: 6, name: 'd' },
      ];
      const action = {
        type: ActionTypes.RECEIVE_ROOMS,
        rooms,
      };

      initialState.currentRoomId = 8;

      const state = reducer(initialState, action);
      expect(state.rooms).to.deep.equal(rooms);
      // defaults to first room
      expect(state.currentRoomId).to.be.equal(8);
    });
  });

  describe('SELECT_ROOM', () => {
    it('should set currentRoomId', () => {
      const room = { id: 12, name: 'sue' };
      const action = {
        type: ActionTypes.SELECT_ROOM,
        room,
      };

      const state = reducer(undefined, action);
      expect(state.currentRoomId).to.be.equal(12);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should set currentUser', () => {
      const action = {
        type: ActionTypes.LOGIN_SUCCESS,
        user: 'bob',
      };

      const state = reducer(undefined, action);
      expect(state.currentUser).to.be.equal('bob');
    });
  });
});
