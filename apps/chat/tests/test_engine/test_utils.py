from django.test import SimpleTestCase
from chat.engine.utils import timestamp

from datetime import datetime


class TimestampTest(SimpleTestCase):
    def test(self):
        self.assertEqual(
            timestamp(datetime(2016, 7, 20, 9, 46, 39)),
            1469007999
        )
