from django.shortcuts import render
from django.http import HttpResponse

 
def index(request):
	context = {'title': 'Домашняя школа'}
	return render(request, 'domashkola/index.html', context)
 