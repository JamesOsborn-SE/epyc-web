from rest_framework import serializers
from .models import Game, Entry, OneTimeUseCode

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = serializers.ALL_FIELDS

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = serializers.ALL_FIELDS

class OneTimeUseCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneTimeUseCode
        fields = serializers.ALL_FIELDS