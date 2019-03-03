from django.http import JsonResponse
from django.shortcuts import render, redirect
import movies.models as models
from movies.forms import MoviesForm


class Movies:

    @staticmethod
    def list(request):

        if request.GET:

            movies = models.Movies.objects.all().order_by('title')

            data_movies = list()

            for movie in movies:
                data_movies.append([movie.title, ])

            return JsonResponse({'data': data_movies}, safe=False)

        return render(request, 'movies/pages/list.html')

    @staticmethod
    def add(request):

        if request.method == 'POST':

            form = MoviesForm(request.POST)

            if form.is_valid():

                form.save()

                return JsonResponse({'success': True}, status=200)

            else:
                return JsonResponse({'success': False}, status=400)

        return render(request, 'movies/pages/add.html', {'form': MoviesForm()})

    @staticmethod
    def details(request):

        if request.method == 'GET':

            title = request.GET.get('title')
            is_new = bool(request.GET.get('new'))

            print(title)

            if title:

                is_seen = models.Movies.objects.filter(title=str(title)).exists()
                return render(request, 'movies/pages/details.html', {'title': title, 'new': is_new, 'seen': is_seen})

        return redirect('/')

    @staticmethod
    def check_title(request):

        if request.method == 'GET':

            try:
                exists = models.Movies.objects.filter(title=str(request.GET.get('title'))).exists()

                if not exists:
                    return JsonResponse({'success': True}, status=200)

            except Exception as e:
                pass

            return JsonResponse({'success': False}, status=400)
