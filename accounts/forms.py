from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm, PasswordResetForm, SetPasswordForm, SetPasswordMixin
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django import forms
from .models import User
# from django.contrib.auth.views import LoginView, LogoutView



class LoginForm(forms.Form):
    email = forms.EmailField(label='Адрес электронной почты', widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(max_length=100, label='Пароль', widget=forms.PasswordInput(attrs={'class': 'form-control'}))


class SignUpForm(forms.ModelForm):
    username = forms.CharField(max_length=100, label="Имя пользователя", widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(label='Адрес электронной почты', widget=forms.TextInput(attrs={'class': 'form-control'}))
    first_name = forms.CharField(max_length=100, label="Имя", required=False, widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(max_length=100, label="Фамилия", required=False, widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(max_length=100, label="Пароль", widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    password2 = forms.CharField(max_length=100, label="Повтор пароля", widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Такой E-mail уже существует!")
        return email

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError("Пароли не совпадают!")
        return cd['password2']

class CustomPasswordChangeForm(PasswordChangeForm):
    old_password = forms.CharField(label="Старый пароль", widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    new_password1 = forms.CharField(label="Новый пароль", widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    new_password2 = forms.CharField(label="Подтвердите новый пароль", widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    field_order = ["old_password", "new_password1", "new_password2"]
    def clean_old_password(self):
        """
        Validate that the old_password field is correct.
        """
        old_password = self.cleaned_data["old_password"]
        if not self.user.check_password(old_password):
            raise ValidationError(
                self.error_messages["password_incorrect"],
                code="password_incorrect",
            )
        return old_password

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['new_password1'] != cd['new_password2']:
            raise forms.ValidationError("Пароли не совпадают!")
        return cd['new_password1']

class CustomPasswordResetForm(PasswordResetForm):
    email = forms.EmailField(
        label="Адрес электронной почты:",
        max_length=254,
        widget=forms.EmailInput(attrs={'class': 'form-control', 'autocomplete': 'email'}),
    )

class CustomSetPasswordForm(SetPasswordForm):
    new_password1 = forms.CharField(label="Новый пароль", widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    new_password2 = forms.CharField(label="Повтор нового пароля", widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    # field_order = ["new_password1", "new_password2"]

    # def clean_new_password2(self):
    #     # print('-------------------------------------------------------')
    #     # print('метод clean_new_password2 класса CustomSetPasswordForm')
    #     # print('-------------------------------------------------------')
    #     cd = self.cleaned_data
    #     if cd['new_password1'] != cd['new_password2']:
    #         raise forms.ValidationError("Пароли не совпадают!")
    #     return cd['new_password1']


# class SignUpForm(forms.ModelForm):
#     username = forms.CharField(label="Логин")
#     password = forms.CharField(label="Пароль", widget=forms.PasswordInput)
#     password2 = forms.CharField(label="Повтор пароля", widget=forms.PasswordInput)

#     class Meta:
#         model = get_user_model()
#         fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']
#         labels = {
#             'username': 'Логин',
#             'email': 'E-mail',
#             'first_name': 'Имя',
#             'last_name': 'Фамилия',
#         }


#     def clean_email(self):
#         email = self.cleaned_data['email']
#         if User.objects.filter(email=email).exists():
#             raise forms.ValidationError("Такой E-mail уже существует!")
#         return email

#     def clean_password2(self):
#         cd = self.cleaned_data
#         if cd['password'] != cd['password2']:
#             raise forms.ValidationError("Пароли не совпадают!")
#         return cd['password2']

# class LoginForm(LoginView):
#     form_class = AuthenticationForm
#     template_name = 'accounts/login.html'
#     extra_context = {'title': "Авторизация"}

    # def get_success_url(self):
    #     return reverse_lazy('index')
