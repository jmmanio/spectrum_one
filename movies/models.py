from django.db import models


class Movies(models.Model):
    title       = models.CharField(max_length=128, unique=True)
    is_active   = models.BooleanField(default=True)

    class Meta:
        db_table = 'movies'
