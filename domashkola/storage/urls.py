from django.urls import path
from . import views

app_name = 'storage'
urlpatterns = [
    # path('', views.index, name='index'),
    path('', views.IndexView.as_view(), name = 'index'),
    # path('contentjson', views.contentjson, name='contentjson'),
    path('menujson', views.menujson, name='menujson'),
    path('func', views.func),
]
