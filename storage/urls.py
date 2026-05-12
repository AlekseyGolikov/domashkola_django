from django.contrib.auth.views import LoginView, LogoutView, PasswordResetView, PasswordChangeView
from django.urls import path
from . import views

app_name = 'storage'
urlpatterns = [
    path('', views.index, name='index'),
    # path('', views.IndexView.as_view(), name = 'index'),
    path('menujson', views.menujson, name='menujson'),
]
