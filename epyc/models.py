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
    created_at = models.DateField(auto_now_add=True)

class Entry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(
        User, 
        on_delete = models.CASCADE,
        blank = False,
        null = False)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    sequence = models.IntegerField(blank = False,
        null = False)
    sentence = models.CharField(max_length=500,blank=True)
    drawing = models.BinaryField(blank=True,null=True)
