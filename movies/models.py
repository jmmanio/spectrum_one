from django.db import models


class Movies(models.Model):
    title = models.CharField(max_length=128)
    year  = models.CharField(max_length=4)

    class Meta:
        db_table = 'movies'
