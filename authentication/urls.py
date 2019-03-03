from django.urls import path
from authentication.views import Authentication

app = 'authentication'

urlpatterns = [
    path('checkuser', Authentication.check_username, name='check-username'),
]
