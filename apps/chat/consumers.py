from channels.sessions import channel_session

from .engine import ChatEngine


@channel_session
def ws_add(message):
    pass


@channel_session
def ws_message(message):
    print(message.content)
    ChatEngine.dispatch(message)


@channel_session
def ws_disconnect(message):
    ChatEngine(message).disconnect()
