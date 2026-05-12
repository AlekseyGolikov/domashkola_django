from django.urls import path
from django.contrib.auth.views import LogoutView, PasswordChangeDoneView, PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from django.urls import reverse_lazy
from . import views
from .forms import CustomPasswordResetForm, CustomSetPasswordForm


app_name = 'accounts'
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('signup/', views.signup_view, name='signup'),
    path('cabinet/', views.cabinet_view, name='cabinet'),
    path('password-change/', views.password_change_view, name='password_change'),
    path('password-change/done/',
         PasswordChangeDoneView.as_view(
             template_name="accounts/password_change_done.html"),
             name='password_change_done'),
    path('password-reset/',
         PasswordResetView.as_view(
               template_name = "accounts/password_reset_form.html",
               form_class = CustomPasswordResetForm,
               email_template_name="accounts/password_reset_email.html",
               success_url=reverse_lazy("accounts:password_reset_done")),
               name='password_reset'),
    path('password-reset/done/',
         PasswordResetDoneView.as_view(
             template_name = "accounts/password_reset_done.html"),
             name='password_reset_done'),
    path('password-reset/<uidb64>/<token>/',
          PasswordResetConfirmView.as_view(
               template_name="accounts/password_reset_confirm.html",
               form_class = CustomSetPasswordForm,
               success_url=reverse_lazy("accounts:password_reset_complete")),
               name='password_reset_confirm'),
    path('password-reset/complete/',
         PasswordResetCompleteView.as_view(
             template_name="accounts/password_reset_complete.html"),
             name='password_reset_complete'),
    path('get_session_info/', views.get_session_info, name='get_session_info'),
]
