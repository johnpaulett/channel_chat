from django.contrib import admin
from . import models


class MessageAdmin(admin.ModelAdmin):
    list_display = ('room', 'timestamp')
admin.site.register(models.Message, MessageAdmin)


class RoomAdmin(admin.ModelAdmin):
    pass
admin.site.register(models.Room, RoomAdmin)


class UserAdmin(admin.ModelAdmin):
    pass
admin.site.register(models.User, UserAdmin)
