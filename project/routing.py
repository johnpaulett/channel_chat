from channels.routing import route
from chat.consumers import ws_add, ws_message, ws_disconnect


channel_routing = [
    route('websocket.connect', ws_add),
    route('websocket.receive', ws_message),
    route('websocket.disconnect', ws_disconnect),
]
