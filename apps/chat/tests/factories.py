import factory


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'chat.User'

    username = 'alice'


class RoomFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'chat.Room'

    @factory.post_generation
    def users(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            # A list of groups were passed in, use them
            for user in extracted:
                self.users.add(user)


class MessageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'chat.Message'

    room = factory.SubFactory(RoomFactory)
    user = factory.SubFactory(UserFactory)
    content = 'Cause I had something to do, something to say'
