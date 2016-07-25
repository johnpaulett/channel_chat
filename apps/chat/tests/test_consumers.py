from channels.message import Message
from django.test import TestCase
from django.test.utils import override_settings
from unittest.mock import patch

from chat.consumers import ws_disconnect, ws_message


@override_settings(CHANNEL_LAYERS={'default': {
    'BACKEND': 'asgiref.inmemory.ChannelLayer',
    'ROUTING': 'project.routing.channel_routing',
}})
class ConsumersTest(TestCase):
    @patch('chat.consumers.ChatEngine')
    def test_ws_message(self, engine):
        message = Message({'reply_channel': 'test-reply'}, None, None)
        ws_message(message)

        engine.dispatch.assert_called_with(message)

    @patch('chat.consumers.ChatEngine')
    def test_ws_disconnect(self, engine):
        message = Message({'reply_channel': 'test-reply'}, None, None)
        ws_disconnect(message)

        engine.assert_called_with(message)
        engine.disconnect.assert_called()
