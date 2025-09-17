from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contentjson', views.contentjson, name='contentjson'),
    path('menujson', views.menujson, name='menujson'),
]
