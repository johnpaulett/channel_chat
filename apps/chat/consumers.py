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
    Group('chat').send({
        'text': json.dumps(action),
        # 'text': json.dumps({
        #     'content': action['content']
        # }),
    })


@channel_session
def ws_disconnect(message):
    Group('chat').discard(message.reply_channel)
