from django import forms
from movies.models import Movies


class MoviesForm(forms.ModelForm):
    title = forms.CharField(required=True,
                            label='Title',
                            widget=forms.TextInput(
                                attrs={'class': 'form-control',
                                       'placeholder': 'Title',
                                       'id': 'title'}, ))

    class Meta:
        model = Movies
        fields = ('title',)
