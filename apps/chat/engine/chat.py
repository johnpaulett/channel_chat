from chat.models import Message, Room, User

from .base import ActionEngine
from . import constants


class ChatEngine(ActionEngine):
    def get_control_channel(self, user=None):
        # Current control channel name, unless told to return `user`'s
        # control channel
        if user is None:
            user = self.message.channel_session['user']
        return 'control.{0}'.format(user)

    def get_room_channel(self, room_id):
        return 'room.{0}'.format(room_id)

    def LOGIN(self, action):

        # Get or create user and assign to session for future requests
        # WARNING: There is NO AUTHENTICATION. Consider moving up to ws_add
        username = action['user']
        user, user_created = User.objects.get_or_create(username=username)
        self.message.channel_session['user'] = username

        # Add this websocket to the user's control channel group
        control = self.get_control_channel()
        self.add(control)

        # Echo back the LOGIN to the client
        self.send(control, {
            'type': constants.LOGIN_SUCCESS,
            'user': username
        })

        # Get or create the list of available rooms
        # Right now each Room is a 1-1 direct message room, but could easily
        # be extended to allow group message rooms.
        # WARNING: This is a very dumb and inefficient first-pass approach,
        # in which we pre-create a Room for every User-User pair. We should
        # instead create rooms on demand or when a user "adds" another user
        # to her "friend list"
        if user_created:
            rooms = []
            for other_user in User.objects.exclude(id=user.id):
                room = Room.objects.create()
                room.users = [user, other_user]
                rooms.append((room.id, room.name(user)))
        else:
            rooms = [
                (room.id, room.name(user)) for room in
                Room.objects.filter(users=user).distinct()
            ]

        # Send the room list back to the user
        self.send(control, {
            'type': constants.RECEIVE_ROOMS,
            'rooms': [
                {'id': room_id, 'name': room_name}
                for room_id, room_name in rooms
            ]
        })

        # Broadcast the user's
        # TODO HOW TO CREATE NEW GROUP()
        for room_id, room_name in rooms:
            # Pre-create a room channel
            room_channel = self.get_room_channel(room)
            self.add(room_channel)

            # Notify the other user
            #TODO
            other_user = room_name  # FIXME when creating group chats
            #self.send(self.get_control_channel(other_user), {
            #    'type': constants.LOGIN_SUCCESS,
            #    'user': username
            #})


    def SEND_MESSAGE(self, action):
        username = self.message.channel_session['user']

        # Store message
        user = User.objects.get(username=username)
        room, room_created = Room.objects.get_or_create()#FIXME
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

    def REQUEST_MESSAGES(self, action):
        # latest_id, room
        # TODO Message.filter(params).order_by('room', '-date', '-id')
        # .select_related room__user
        pass

    def return_messages(self, channel, messages):
        self.send(room_channel, {
            'type': 'RECEIVE_MESSAGES',
            'messages': [{
                'id': m.id,
                'room': room.name(username),
                'content': m.content,
                'timestamp': m.timestamp, #FIXME to unix time
                'user': username,
            } for m in messages],
        })
