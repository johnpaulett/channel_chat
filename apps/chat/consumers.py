from channels import Group
from channels.sessions import channel_session

from .engine import ChatEngine


@channel_session
def ws_add(message):
    Group('chat').add(message.reply_channel)


@channel_session
def ws_message(message):
    print(message.content)
    ChatEngine.dispatch(message)


@channel_session
def ws_disconnect(message):
    Group('chat').discard(message.reply_channel)
