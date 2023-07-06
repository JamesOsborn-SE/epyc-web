from django.db import models

class Game(models.Model):
    id = models.UUIDField(primary_key=True)
    created_at = models.DateField(auto_now=True)

class Entry(models.Model):
    id = models.UUIDField(primary_key=True)
    created_at = models.DateField(auto_now=True)
    gameId = models.ForeignKey(Game, on_delete=models.CASCADE)
    sequence = models.IntegerField()
    sentence = models.CharField(max_length=500)
    drawing = models.BinaryField()
