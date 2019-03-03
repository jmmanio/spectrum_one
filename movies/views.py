from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
import movies.models as models
from movies.forms import MoviesForm

from django.contrib.auth.decorators import login_required


class Movies:

    @staticmethod
    def list(request):

        if request.GET:

            movies = models.Movies.objects.filter(is_active=True).order_by('title')

            data_movies = list()

            btn_liked = '<button class="btn btn-like btn-primary">Like</button>'
            btn_not_liked = '<button class="btn btn-like btn-default">Like</button>'

            if request.user.is_authenticated:
                for movie in movies:

                    try:
                        last_like = models.Likes.objects.filter(movies=movie).latest('timestamp')

                        if last_like.is_liked:
                            like_button = btn_liked
                        else:
                            like_button = btn_not_liked

                    except Exception as e:
                        like_button = btn_not_liked

                    data_movies.append([movie.title, like_button,])

            else:
                for movie in movies:
                    data_movies.append([movie.title,])

            return JsonResponse({'data': data_movies}, safe=False)

        return render(request, 'movies/pages/list.html')

    @staticmethod
    @login_required
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

            try:
                is_new = bool(request.GET.get('new'))
            except:
                is_new = False

            try:
                is_edit = bool(request.GET.get('edit'))
            except:
                is_edit = False

            if title:

                if is_new:
                    is_seen = models.Movies.objects.filter(title=str(title)).exists()
                    return render(request, 'movies/pages/details.html',
                                  {'title': title, 'new': is_new, 'seen': is_seen})

                elif is_edit:
                    return render(request, 'movies/pages/details.html',
                                  {'title': title, 'edit': is_edit})

        return redirect('/')

    @staticmethod
    @login_required
    def edit(request):

        if request.method == 'GET':

            title = request.GET.get('title')

            if title:
                is_seen = models.Movies.objects.filter(title=str(title)).exists()
                return render(request, 'movies/pages/edit.html', {'form': MoviesForm(), 'prev_title': title})

        if request.method == 'POST':

            form = MoviesForm(request.POST)

            prev_title = request.POST.get('prev-title')

            if form.is_valid():

                to_be_edited = models.Movies.objects.get(title=prev_title)
                to_be_edited.title = form.cleaned_data.get('title')
                to_be_edited.save()

                return JsonResponse({'success': True}, status=200)

            else:
                return JsonResponse({'success': False}, status=400)

        return redirect('/')

    @staticmethod
    @login_required
    def like(request):
        if request.method == 'POST':

            title = request.POST.get('title')

            movie = models.Movies.objects.get(title=title)

            try:
                last_like = models.Likes.objects.filter(movies=movie).latest('timestamp')
                new_like = models.Likes(movies=movie, is_liked=not last_like.is_liked)
                new_like.save()

            except Exception as e:
                new_like = models.Likes(movies=movie, is_liked=True)
                new_like.save()

            return JsonResponse({'success': True})

        return JsonResponse({'success': False})

    @staticmethod
    @login_required
    def delete(request):

        if request.method == 'POST':
            to_be_deleted = models.Movies.objects.get(title=request.POST.get('title'))
            to_be_deleted.is_active = False
            to_be_deleted.save()

        return HttpResponse()

    @staticmethod
    @login_required
    def check_title(request):

        if request.method == 'GET':

            try:
                exists = models.Movies.objects.filter(title=str(request.GET.get('title'))).exists()

                if not exists:
                    return JsonResponse({'success': True}, status=200)

            except Exception as e:
                pass

            return JsonResponse({'success': False}, status=400)
