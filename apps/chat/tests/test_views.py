from django.test import TestCase


class IndexViewTest(TestCase):
    def test(self):
        resp = self.client.get('/')
        self.assertContains(resp, 'Channel Chat')


class RobotsTxtViewTest(TestCase):
    def test(self):
        resp = self.client.get('/robots.txt')
        self.assertContains(resp, 'Disallow: /')
