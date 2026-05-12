from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from .models import Content, Grades, Subjects, Presentation, FormatData
# from django.views.generic.list import ListView
from django.contrib.auth.decorators import login_required
from accounts.models import User
from . import views

# @login_required
# class IndexView(ListView):
# 	template_name = 'storage/index.html'
# 	model = Content

@login_required
def index(request):
	session_keys = list(request.session.items())
	print(session_keys)
	return render(request, 'storage/index.html')


def menujson(request):
	res = {}
	user_id = request.session.get('_auth_user_id')
	if user_id is not None:
		user_status = User.objects.get(id = int(user_id)).status
	else:
		return redirect('storage:index')	# если вдруг произошёл разрыв сессии, то загружаем на главную страницу сайта

	if request.method == 'GET':
		# raise Exception('тест')
		resp1 = Grades.objects.values('grade_name', 'grade_code').order_by('id')
		resp2 = Subjects.objects.values('subject_name', 'subject_code').order_by('id')
		resp3 = Presentation.objects.values('presentation_name', 'presentation_code').order_by('id')
		resp4 = FormatData.objects.values('format_name', 'format_code').order_by('id')

		if user_status == 1:
			resp5 = Content.objects.exclude(status=3).exclude(status=2).values('id','grade_id', 'subject_id', 'presentation_id', 'formatData_id', 'title', 'content', 'link').order_by('id')
		if user_status == 2:
			resp5 = Content.objects.exclude(status=3).values('id','grade_id', 'subject_id', 'presentation_id', 'formatData_id', 'title', 'content', 'link').order_by('id')
		if user_status == 3:
			resp5 = Content.objects.values('id','grade_id', 'subject_id', 'presentation_id', 'formatData_id', 'title', 'content', 'link').order_by('id')

		# resp6 = Content.objects.values('id','formatData_id').order_by('id')
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



# def signup_view(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             user = form.save()          # Сохраняем нового пользователя
#             login(request, user)        # Выполняем вход
#             return redirect('index')     # Перенаправляем на главную страницу
#     else:
#         form = SignUpForm()
#     return render(request, 'signup.html', {'form': form})

# def login_view(request):
#     form = LoginForm(data=request.POST or None)
#     if request.method == 'POST':
#         if form.is_valid():
#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password']
#             user = authenticate(username=username, password=password) # Проверяем учетные данные
#             if user is not None:
#                 login(request, user)     # Выполняем вход
#                 return redirect('index')  # Перенаправляем на главную страницу
#     return render(request, 'login.html', {'form': form})

# def logout_view(request):
#     #  return redirect('index')
#     return render(request, 'logged_out.html')

# def func(request):
# 	resp5 = Content.objects.values('grade_id', 'subject_id', 'presentation_id', 'formatData_id', 'content').order_by('id')
# 	# for item in resp5:
# 	# 	for v in item.values():
# 	# 		v = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' if v is None else v
# 	return render(request, 'storage/index.html')
