from django.db import models
from django.contrib.auth.models import User
import uuid

class Game(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        blank = False,
        null = False)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(auto_now_add=False, null=True)

class Entry(models.Model):
    """A game entry
    Attributes:
        drawing: a base64 encoded string with the data type as a prefix
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, 
        on_delete = models.CASCADE,
        blank = False,
        null = False)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    sequence = models.IntegerField(blank = False,
        null = False)
    sentence = models.TextField(max_length=500,blank=True, null=True)
    drawing = models.TextField(blank=True, null=True)
