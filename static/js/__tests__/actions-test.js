import { expect } from 'chai';
import sinon from 'sinon';

import * as actions from '../actions';
import ActionTypes from '../constants';

import { ChatAPI } from '../utils/ChatAPI';

describe('action creators', () => {
  describe('select room', () => {
    it('should select room', () => {
      const room = 'alice';
      const expectedAction = {
        type: ActionTypes.SELECT_ROOM,
        room,
      };
      expect(actions.selectRoom(room)).to.deep.equal(expectedAction);
    });
  });
});


describe('async action creators', () => {
  let sendStub;
  beforeEach(() => {
    sendStub = sinon.stub(ChatAPI, 'send');
  });

  afterEach(() => {
    sendStub.restore();
  });

  describe('login', () => {
    it('should send to API', () => {
      const user = 'grace';
      const expectedAction = {
        type: ActionTypes.LOGIN,
        user,
      };

      const thunk = actions.loginUser(user);
      thunk();

      expect(sendStub.calledWith(expectedAction)).to.be.equal(true);
    });
  });

  describe('send message', () => {
    it('should send to API', () => {
      const room = 'grace';
      const content = 'hi bob';
      const expectedAction = {
        type: ActionTypes.SEND_MESSAGE,
        room,
        content,
      };

      const thunk = actions.sendMessage(room, content);
      thunk();

      expect(sendStub.calledWith(expectedAction)).to.be.equal(true);
    });
  });

});
