from django.contrib import admin
from .models import Game, Entry, OneTimeUseCode

# Register your models here.
admin.site.register(Game)
admin.site.register(Entry)
admin.site.register(OneTimeUseCode)