from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render
from .forms import RegisterForm, LoginForm
from django.contrib.auth.models import User


class Authentication:

    @staticmethod
    def register(request):

        if request.method == 'POST':

            form = RegisterForm(request.POST)

            if form.is_valid():

                form.save()
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password1')

                user = authenticate(username=username, password=password)
                login(request, user)

                return JsonResponse({'success': True}, status=200)

            else:
                return JsonResponse({'success': False}, status=400)

        else:
            return render(request, 'authentication/pages/register.html', {'form': RegisterForm()})

    @staticmethod
    def login(request):

        if request.method == 'POST':

            form = LoginForm(request.POST)

            if form.is_valid():
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password')

                user = authenticate(username=username, password=password)

                if user is not None:
                    login(request, user)
                    return JsonResponse({'success': True}, status=200)

            return JsonResponse({'success': False}, status=400)

        else:
            return render(request, 'authentication/pages/login.html', {'form': LoginForm()})

    @staticmethod
    def logout(request):
        logout(request)
        return HttpResponseRedirect('/')

    @staticmethod
    def check_username(request):

        if request.method == 'GET':

            try:

                exists = User.objects.filter(username=str(request.GET.get('username'))).exists()

                if not exists:
                    return JsonResponse({'success': True}, status=200)

            except Exception as e:
                pass

            return JsonResponse({'success': False}, status=400)
