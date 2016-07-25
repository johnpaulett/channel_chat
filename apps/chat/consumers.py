from channels.sessions import channel_session

from .engine import ChatEngine


@channel_session
def ws_connect(message):
    # TODO Move many LOGIN_USER actions from ws_message into ws_add
    pass


@channel_session
def ws_message(message):
    ChatEngine.dispatch(message)


@channel_session
def ws_disconnect(message):
    ChatEngine(message).disconnect()
