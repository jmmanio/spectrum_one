import django.http
from django.shortcuts import render
import movies.models as models


class Movies:

    @staticmethod
    def list(request):

        if request.GET:

            movies = models.Movies.objects.all().order_by('title')

            data_movies = list()

            for movie in movies:
                data_movies.append([movie.title,])

            return django.http.JsonResponse({'data': data_movies}, safe=False)

        return render(request, 'movies/pages/list.html')
