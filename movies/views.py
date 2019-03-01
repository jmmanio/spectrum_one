from django.shortcuts import render
from .models import Movies


def index(request):
    return render(request, 'movies/pages/list.html')


def login(request):
    return render(request, 'authentication/pages/login.html')


def register(request):
    return render(request, 'authentication/pages/register.html')