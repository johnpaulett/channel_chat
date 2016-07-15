from channels import Group
from channels.sessions import channel_session

from .models import Message, Room, User

import json


@channel_session
def ws_add(message):
    Group('chat').add(message.reply_channel)


@channel_session
def ws_message(message):
    print(message.content)
    action = json.loads(message.content['text'])

    ActionEngine.dispatch(message, action)


@channel_session
def ws_disconnect(message):
    Group('chat').discard(message.reply_channel)


class ActionEngine(object):
    @classmethod
    def dispatch(cls, message, action):
        engine = cls()

        # Simple protection to only expose upper case methods
        # to client-side directives
        action_type = action['type'].upper()
        if hasattr(engine, action_type):
            method = getattr(engine, action_type)
            return method(message, action)

    def add(self, group, message):
        Group(group).add(message.reply_channel)

    def send(self, group, action):
        Group(group).send({
            'text': json.dumps(action),
        })

    def get_control_channel(self, message):
        return 'control.' + message.channel_session['user']

    def get_room_channel(self, room):
        return 'room.{0}'.format(room.id)

    def LOGIN(self, message, action):

        # WARNING: There is NO AUTHENTICATION. Get or create user and
        # assign to session for future requests
        username = action['user']
        user, _ = User.objects.get_or_create(username=username)
        message.channel_session['user'] = username

        # Add this websocket to the user's control channel group
        control = self.get_control_channel(message)
        self.add(control, message)

        # Echo back the LOGIN to the client
        self.send(control, action)

        # TODO Add to rooms
        # TODO Send room list
        # TODO Broadcast is_active

    def SEND_MESSAGE(self, message, action):
        username = message.channel_session['user']

        # Store message
        user = User.objects.get(username=username)
        room = Room.objects.get_or_create()#FIXME
        m = Message.objects.create(
            user=user,
            room=room,
            content=action['content'],
        )

        # Broadcast the message to the room
        room_channel = self.get_room_channel(room)
        #FIXME extract
        self.send(room_channel, {
            'type': 'RECEIVE_MESSAGES',
            'messages': [{
                'id': m.id,
                'room': room.name(username),
                'content': m.content,
                'timestamp': m.timestamp, #FIXME to unix time
                'user': username,
            }],
        })

    def REQUEST_MESSAGES(self, message, action):
        # TODO Message.filter(params)
        pass
