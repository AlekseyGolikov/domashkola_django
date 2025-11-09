from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import Content, Grades, Subjects, Presentation, FormatData
from django.views.generic.list import ListView
import os


class IndexView(ListView):
	template_name = 'storage/index.html'
	model = Content



def menujson(request):
	res = {}
	if request.method == 'GET':
		# raise Exception('тест')
		resp1 = Grades.objects.values('grade_name', 'grade_code').order_by('id')
		resp2 = Subjects.objects.values('subject_name', 'subject_code').order_by('id')
		resp3 = Presentation.objects.values('presentation_name', 'presentation_code').order_by('id')
		resp4 = FormatData.objects.values('format_name', 'format_code').order_by('id')
		resp5 = Content.objects.values('grade_id', 'subject_id', 'presentation_id', 'formatData_id', 'title', 'content', 'link').order_by('id')
		res1 = [item for item in resp1]
		res2 = [item for item in resp2]
		res3 = [item for item in resp3]
		res4 = [item for item in resp4]
		res5 = [item for item in resp5]
		res['grades'] = res1
		res['subjects'] = res2
		res['presentation'] = res3
		res['formatData'] = res4
		res['content'] = res5
		return JsonResponse(res, safe=False)
	else:
		return render(request, 'storage/error.html', {'error_msg': {0: 'Профилактические работы на сервере', 1: 'Повторите попытку позже'}})





def func(request):
	resp5 = Content.objects.values('grade_id', 'subject_id', 'presentation_id', 'formatData_id', 'content').order_by('id')
	# for item in resp5:
	# 	for v in item.values():
	# 		v = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' if v is None else v
	return render(request, 'storage/index.html')
