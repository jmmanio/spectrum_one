from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegisterForm(UserCreationForm):
    username = forms.CharField(required=True,
                               label='Username',
                               min_length=2,
                               widget=forms.TextInput(
                                   attrs={'class': 'form-control',
                                          'placeholder': 'Username',
                                          'id': 'username'}, ))

    password1 = forms.CharField(required=True,
                                label='Password',
                                min_length=2,
                                widget=forms.PasswordInput(
                                    attrs={'class': 'form-control',
                                           'placeholder': 'Password',
                                           'id': 'password'}))

    password2 = forms.CharField(required=True,
                                label='Confirm Password',
                                min_length=2,
                                widget=forms.PasswordInput(
                                    attrs={'class': 'form-control',
                                           'placeholder': 'Confirm Password',
                                           'id': 'confirm-password'}))

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')
