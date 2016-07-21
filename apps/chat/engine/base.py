from channels import Group

import json


class ActionEngine(object):
    """A simple dispatcher that consumes a Redux-style action and routes
    it to a method on the subclass, using the `action.type`.

    E.g. If an action comes in {type: 'login', user: 'bob'}, it will
    call the `LOGIN` method, passing in the the asgi message and parsed
    action.

    This is a very simplistic router and likely not ideal for longer-term
    since it ties the React client-side actions, to the network procedure
    calling protocol, to the server-side method definition. It also
    effectively exposes the Python methods to the client which could
    be a security risk, though we do mitigate by uppercasing the requested
    method which so not expose protected methods.

    Callers should use the `ActionEngine.dispath(message)`. Subclasses
    can use the `add` and `send` methods.
    """
    @classmethod
    def dispatch(cls, message):
        engine = cls(message)

        # Parse the websocket message into a JSON action
        action = json.loads(message.content['text'])

        # Simple protection to only expose upper case methods
        # to client-side directives
        action_type = action['type'].upper()
        if hasattr(engine, action_type):
            method = getattr(engine, action_type)
            return method(action)
        else:
            raise NotImplementedError('{} not implemented'.format(action_type))

    def __init__(self, message):
        self.message = message

    def add(self, group):
        Group(group).add(self.message.reply_channel)

    def send(self, action, to=None):
        if to is None:
            to = self.message.reply_channel
        to.send({
            'text': json.dumps(action),
        })

    def send_to_group(self, group, action):
        self.send(action, to=Group(group))
