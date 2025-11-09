from django.urls import path
from . import views

app_name = 'storage'
urlpatterns = [
    # path('', views.index, name='index'),
    path('android', views.IndexView.as_view(), name = 'index'),
    path('json_api/', views.json_api, name = 'json_api'),
]
