from datetime import datetime
from django.test import TestCase

from .factories import MessageFactory, RoomFactory, UserFactory

import pytz


class UserTest(TestCase):
    def test_str(self):
        u = UserFactory.create()
        self.assertEqual(str(u), 'alice')


class RoomTest(TestCase):
    def test_name(self):
        r = RoomFactory.create(users=[
            UserFactory.create(username='alice'),
            UserFactory.create(username='bob'),
        ])
        self.assertEqual(r.name('alice'), 'bob')

    def test_str(self):
        r = RoomFactory.create(users=[
            UserFactory.create(username='alice'),
            UserFactory.create(username='bob'),
        ])
        self.assertEqual(str(r), 'alice-bob')

    def test_str_empty(self):
        # Shouldn't happen, just ensure no 500
        r = RoomFactory.create()
        self.assertEqual(str(r), '')


class MessageTest(TestCase):
    def test_str(self):
        m = MessageFactory.create(
            timestamp=datetime(2016, 7, 4, 5, 27, 30, tzinfo=pytz.utc)
        )
        self.assertEqual(str(m), 'alice at 2016-07-04 05:27:30+00:00')
