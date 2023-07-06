from rest_framework import serializers
from .models import Game, Entry

class GameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Game
        fields = ['id','created_at','user']

class EntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Entry
        fields = ['id','created_at','gameId','sequence','sentence','drawing']