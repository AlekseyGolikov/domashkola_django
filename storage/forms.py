from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=150)
    file = forms.FileField()
