from asgiref.inmemory import ChannelLayer
from channels import Channel, Group
from channels.asgi import get_channel_layer
from channels.handler import AsgiRequest
from channels.message import Message
from django.contrib.sessions.backends.file import SessionStore
from django.test import TestCase
from django.test.utils import override_settings
from unittest.mock import Mock

from chat.engine import ChatEngine
from chat.models import Message, Room, User

import json


class MessageStub(object):
    """Minimal stub for replicating `channels.message.Message`"""
    def __init__(self):
        self.channel_session = {}
        self.reply_channel = Channel('foo!123')


@override_settings(CHANNEL_LAYERS={'default': {
    'BACKEND': 'asgiref.inmemory.ChannelLayer',
    'ROUTING': 'project.routing.channel_routing',
}})
class ChatEngineTestCase(TestCase):
    def setUp(self):
        self.channel_layer = get_channel_layer()
        self.channel_layer.flush()

        self.message = MessageStub()
        self.engine = ChatEngine(self.message)

    def tearDown(self):
        self.channel_layer.flush()

    def assertJsonEqual(self, encoded, expected):
        result = json.loads(encoded)
        self.assertEqual(result, expected)


class LoginTest(ChatEngineTestCase):
    def test_new_user(self):
        self.engine.LOGIN({'user': 'bob'})
        self.assertEqual('bob', User.objects.get().username)

    def test_existing_user(self):
        u = User.objects.create(username='bob')
        self.engine.LOGIN({'user': 'bob'})
        self.assertEqual(u.id, User.objects.get().id)

    def test_user_set_into_session(self):
        self.engine.LOGIN({'user': 'bob'})
        self.assertEqual(self.message.channel_session['user'], 'bob')
        # Ensure message echo'ed back via the user's control channel

    def test_login_success_to_client(self):
        self.engine.LOGIN({'user': 'bob'})
        #print(self.channel_layer._groups)
        #print(self.channel_layer._channels)
        self.assertJsonEqual(
            self.channel_layer._channels[str(self.message.reply_channel)].popleft()[1]['text'],
            {'type': 'LOGIN_SUCCESS', 'user': 'bob'}
        )

    def test_rooms_created(self):
        pass#TODO

    def test_receive_rooms(self):
        pass#TODO


class SendMessageTest(ChatEngineTestCase):
    def setUp(self):
        super().setUp()

        User.objects.create(username='alice')

        self.engine.LOGIN({'user': 'bob'})
        self.room = Room.objects.get()

    def test(self):
        self.engine.SEND_MESSAGE({
            'roomId': self.room.id,
            'content': 'hello world',
        })

        m = Message.objects.get()
        self.assertEqual('hello world', m.content)
        self.assertEqual('bob', m.user.username)
        self.assertEqual(self.room, m.room)

        # Ensure we get a RECEIVE_MESSAGES back
        print(self.channel_layer._channels)
