from django.urls import path
from authentication.views import Authentication

app = 'authentication'

urlpatterns = [
    path('logout', Authentication.logout, name='logout'),
    path('checkuser', Authentication.check_username, name='check-username'),
]
