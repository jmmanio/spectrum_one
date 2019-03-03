from django.db import models
from django.contrib.auth.models import User


class Movies(models.Model):
    title = models.CharField(max_length=128, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'movies'


class Likes(models.Model):
    movies = models.ForeignKey(Movies, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_liked = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'likes'
