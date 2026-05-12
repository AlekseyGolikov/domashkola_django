from django.contrib import messages
from django.shortcuts import render, redirect, HttpResponseRedirect, reverse, HttpResponse
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.contrib.auth import login, authenticate, update_session_auth_hash
from django.http import JsonResponse
# from django.contrib.auth.models import User
from .models import User
from .forms import LoginForm, SignUpForm, CustomPasswordChangeForm
from django.contrib.auth.decorators import login_required

@login_required
def get_session_info(request):
    res = {}
    user_id = request.session.get('_auth_user_id')
    # for key, value in request.session.items():
    #     print(f'{key} => {value}')
    res['user_id'] = user_id
    if user_id is not None:
        user = User.objects.get(id=int(user_id))
        res['username'] = user.username
    else:
        username = None
        res['username'] = None

    return JsonResponse(res, safe=False)

def login_view(request):
    error = None
    try:
        form = LoginForm(data=request.POST or None)

        if request.method == 'POST':
            if form.is_valid():
                # print('--------------------------------------------------------')
                # print('   login_view')
                # print('--------------------------------------------------------')
                email = form.cleaned_data['email']
                password = form.cleaned_data['password']
                user = authenticate(email=email, password=password) # Проверяем учетные данные
                if user is not None:
                    login(request, user)     # Выполняем вход
                    return redirect('storage:index')  # Перенаправляем на главную страницу
                raise ValueError('Адрес электронной почты или пароль введены не верно!')
    except :
        error = 'Ошибка авторизации!'
    return render(request, 'accounts/login.html', {'form': form, 'error': error})


def signup_view(request):
    if request.method == 'POST':
        # print('-------------------------------------------------------')
        # print('request.POST = ', request.POST)
        # print('-------------------------------------------------------')
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)          # создание объекта без сохранения в БД
            user.set_password(form.cleaned_data['password'])
            user.save()
            return render(request, 'accounts/signup_done.html')
    else:
        form = SignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})

@login_required
def password_change_view(request):
    if request.method == 'POST':
        form = CustomPasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Пароль сменен успешно')
            return redirect(reverse('accounts:password_change_done'))
    else:
        form = CustomPasswordChangeForm(request.user)
    return render(request,
                  'accounts/password_change.html',
                  {'form': form},
                )

@login_required
def cabinet_view(request):
    user_id = request.session.get('_auth_user_id')
    user = User.objects.get(id=int(user_id))
    content = {'username': user.username,
               'email': user.email,
               'first_name': user.first_name,
               'last_name': user.last_name}
    return render(request, 'accounts/cabinet.html', {'content': content})



# class UserPasswordChange(PasswordChangeView):
#     form_class = UserPasswordChangeForm
#     success_url = reverse_lazy("accounts:password_change_done")
#     template_name = "accounts/password_change_form.html"
#     extra_context = {'title': "Изменение пароля"}



# def signup_view(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)          # Сохраняем нового пользователя
#             user.set_password(form.cleaned_data['password1'])
#             user.save()
#             profile = Profile.objects.create(user=user)
#             profile.save()
#             return render(request, 'accounts/signup_done.html')
#     else:
#         form = SignUpForm()
#     return render(request, 'accounts/signup.html', {'form': form})


# class RegisterUser(CreateView):
#     form_class = SignUpForm
#     template_name = 'accounts/signup.html'
#     extra_context = {'title': "Регистрация"}
#     success_url = reverse_lazy('accounts:signup_done')


# def signup_done(request):
#     return render(request, 'accounts/signup_done.html')
