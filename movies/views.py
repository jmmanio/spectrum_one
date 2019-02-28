from django.shortcuts import render
from .models import Movies


def index(request):
    return render(request, 'movies/pages/list.html')
