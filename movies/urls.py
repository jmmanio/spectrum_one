from django.urls import path
from movies.views import Movies

app = 'movies'

urlpatterns = [
    path('add', Movies.add, name='add'),
]
