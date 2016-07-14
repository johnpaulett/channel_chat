from django.db import models
from django.utils import timezone


class User(models.Model):
    # We implement a basic user model (we are ignoring authentication
    # at the moment, so anyone can "log" in as anyone. We should
    # switch to use django.contrib.auth.models.User
    username = models.TextField()

    def __str__(self):
        return self.username


class Room(models.Model):
    # While we are only concerned about user-to-user direct messages,
    # we model more generally to allow future multi-user rooms
    users = models.ManyToManyField(User)

    # TODO Store an actual room name, but for now we'll cheat and just
    # call it the name of the other user
    def name(self, current_username):
        return str(self.users.exclude(username=current_username)[0])

    def __str__(self):
        return '-'.join(
            x[0] for x in self.users.order_by('id').values_list('username')
        )


class Message(models.Model):
    room = models.ForeignKey(Room, related_name='messages')
    user = models.ForeignKey(User)
    timestamp = models.DateTimeField(db_index=True, default=timezone.now)
    content = models.TextField()

    def __str__(self):
        return '{0} at {1}'.format(self.user, self.timestamp)
