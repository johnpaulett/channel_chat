channels-chat
=============

Demonstration of a WebSockets-based chat server, utilizing:

* `Django Channels <http://channels.readthedocs.io/>`_
* `React <https://facebook.github.io/react/>`_ and `Redux <http://redux.js.org/>`_
  for a reactive client-side application
* Redis as a scalable backend


https://github.com/johnpaulett/channel_chat

.. image::
   https://raw.githubusercontent.com/johnpaulett/channel_chat/master/static/docs/channel-chat.gif
   :scale: 50%


How it works
------------

A React / Redux frontend application written in ES6, communicates via a
Websocket connection to a Python-based ASGI server. The frontend sends
Redux-style actions as JSON via the Websocket connection, such as
``"{'type': 'LOGIN_USER', 'username': 'joe'}"``. As implemented by `Django Channels
<http://channels.readthedocs.io/en/latest/concepts.html>`_, the ASGI Interface
Server handles the Websocket connection, passing the message onto a Redis queue
for any available Worker to consume the message.  The consumers will use the
Redux-style action to delegate to the appropriate ``chat.engine.ChatEngine``
method (e.g. ``LOGIN_USER``, ``REQUEST_MESSAGES``).  The ``ChatEngine`` method
typically will perform some database action (lookup user / messages, store
message) and respond to ``send`` a response back to one or more Channels,
which the Interface server will read back from Redis and communicate back to
the client via the open Websocket connection.  The ``ChatEngine`` currently
can send to three types of Channels:

1) "Room channels", a ``channels.Group`` representing an ``chat.models.Room``,
   in which all clients that are part of that room will receive the message.
2) The "control channel", a ``channels.Group`` representing all open
   socket connections for a specific ``chat.models.User``.
3) The "reply channel", the specific channel for the current websocket
   connection.


Supported Actions
-----------------

channel_chat is a functional MVP to test out websockets, Channels, and React,
but lacks several key items necessary to make it a production-ready chat
application (see TODO).  The currently supported actions are:

* Connect - Client connection is immediately upgraded from HTTP to Websocket
* Login - User enters handle, ``LOGIN_USER`` sent to server. Server responds with
  ``LOGIN_SUCCESS`` (see TODO below) and list of rooms (``RECEIVE_ROOMS``),
  pre-building the all the "room channels".
* Send Message - The user can select a Room, enter text and issue a
  ``SEND_MESSAGE`` to the server. The server will store the
  ``chat.models.Message``, then broadcast that message back out to the entire
  "room channel" via the ``RECEIVE_MESSAGES`` action.  Clients, upon receiving
  the ``RECEIVE_MESSAGES`` action, will update it's Redux state and, if in the
  room receiving he message, reactively re-render the ``<MessageList />``.
  This "room channel" abstraction means that all active websockets will receive
  the broadcast, even if the same user is logged in from multiple devices.
* Clients can request message history via ``REQUEST_MESSAGES``, which is
  returned via the "reply channel". Several events trigger a message request:

  * When changing rooms, a room ID is passed, and the last 50 messages are sent
    (see TODO)
  * If the client disconnects and the ``ReconnectingWebsocket`` is able to
    reconnect, on reconnect, all messages since the `last message` are requested
    and returned.
  * When scrolling back into the room's history, the client will request
    messages earlier than the first message for that room (see TODO for better
    infinite scroll).


TODO
----

* Real authentication and then migrate the HTTP session into the Channel session
  as part of ``ws_connect``.
* Multi-user rooms. Abstraction already in place for 1 Room to Many Users.
  Need to ensure controls around who can send to which Rooms.
* "Add Contact" functionality. Currently we inefficiently pre-create 1-1 rooms
  for every user pair.
* Implement Active / Inactive status flag to show who is online (track via
  Control-group ping after User hits ``ws_disconnect``).
* Implement an unread message count next to the ``<Room />``.
* Avoid re-requesting messages for a room when switching between rooms.
* Implement intelligent "infinite scroll" when scrolling back on a room's
  history. Basic onScroll has been implemented, but should trigger prior to
  ``scrollTop == 0``, should display a loading indicator, and should stay pinned
  to location of current messages in view.
* Better workflow for initial post-login (e.g. user's last open room).
* Implement `@handle` parsing and linking.
* Implement the Notification Browser API to provide OS-level alerts on new
  messages.
* Provide message search.


Running
--------

The system has been tested with Ubuntu 14.04, node.js 6.0.3, Python 3.4::

  git clone https://github.com/johnpaulett/channel_chat
  cd channel_chat

Add :file:`project/local_settings.py`, with a ``SECRET_KEY`` and optionally
``DEBUG``::

  SECRET_KEY = 'mysecret'
  DEBUG = True

Continue::

  nvm use 6  # assumes using nvm to install node.js 6
  make env
  make static
  make createdb
  make migrate
  make serve

To run the test suites (mocha and Python unittest)::

  make test
