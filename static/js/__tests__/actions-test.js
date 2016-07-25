import { expect } from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import * as actions from '../actions';
import ActionTypes from '../constants';

import { ChatAPI } from '../utils/ChatAPI';


describe('async action creators', () => {
  const mockStore = configureStore([thunkMiddleware]);

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
      const expectedApi = {
        type: ActionTypes.LOGIN,
        user,
      };

      actions.loginUser(user)();

      expect(sendStub.calledWith(expectedApi)).to.be.equal(true);
    });
  });

  describe('select room', () => {
    it('should select room', () => {
      const room = { name: 'alice', id: 5 };
      const expectedAction = {
        type: ActionTypes.SELECT_ROOM,
        room,
      };
      const expectedApi = {
        type: ActionTypes.REQUEST_MESSAGES,
        roomId: room.id,
      };
      const store = mockStore({});


      actions.selectRoom(room)(store.dispatch);

      expect(sendStub.calledWith(expectedApi)).to.be.equal(true);

      expect(store.getActions()).to.deep.equal([expectedAction]);
    });
  });

  describe('send message', () => {
    it('should send to API', () => {
      const roomId = 25;
      const content = 'hi bob';
      const expectedApi = {
        type: ActionTypes.SEND_MESSAGE,
        roomId,
        content,
      };

      actions.sendMessage(roomId, content)();

      expect(sendStub.calledWith(expectedApi)).to.be.equal(true);
    });
  });

  describe('request messages', () => {
    it('should send to API', () => {
      const room = { name: 'alice', id: 5 };
      const expectedApi = {
        type: ActionTypes.REQUEST_MESSAGES,
        roomId: 5,
      };

      actions.requestMessages(room);

      expect(sendStub.calledWith(expectedApi)).to.be.equal(true);
    });
  });

  describe('request prior messages', () => {
    it('should send firstMessageId to API', () => {
      const room = { name: 'alice', id: 5 };
      const messages = [
        { id: 6 },
        { id: 7 },
        { id: 4 },
        { id: 8 },
      ];

      const expectedApi = {
        type: ActionTypes.REQUEST_MESSAGES,
        roomId: 5,
        firstMessageId: 4,
      };

      actions.requestPriorMessages(room, messages)();

      expect(sendStub.calledWith(expectedApi)).to.be.equal(true);
    });
  });
});
