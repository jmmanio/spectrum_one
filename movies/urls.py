from django.conf.urls import url
from django.urls import path
from movies.views import Movies

app = 'movies'

urlpatterns = [
    path('checktitle', Movies.check_title, name='checktitle'),
    path('add', Movies.add, name='add'),
    url(r'^details.+/?$', Movies.details, name='details'),
]
