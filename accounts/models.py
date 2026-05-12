from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        print('-------------------------------------------------------')
        print('  Работает метод create_user класса CustomUserManager ')
        print('-------------------------------------------------------')
        if not email:
            raise ValueError('Необходимо ввести адрес электронной почты')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        print('-------------------------------------------------------')
        print('  Работает метод create_superuser класса CustomUserManager ')
        print('-------------------------------------------------------')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Суперпользователь должен иметь параметр is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Суперпользователь должен иметь параметр is_superuser=True.')
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = models.CharField(max_length=150, null=True, blank=True)
    password = models.CharField(max_length=100, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=False, blank=False)
    last_name = models.CharField(max_length=100, null=False, blank=False)
    status = models.IntegerField(null=False, blank=False, default=1)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
        # status = 1 - пользователь с наименьшим уровнем доступа
        # status = 2 - пользователю доступны записи с полями status=1 и 2
        # status = 3 - пользователю доступны записи с полями status=1, 2 и 3



# class CustomUser(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(unique=True, verbose_name='Email Address')
#     first_name = models.CharField(max_length=150, blank=False, null=False, verbose_name='Имя')
#     last_name = models.CharField(max_length=150, blank=False,  null=False, verbose_name='Фамилия')
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []  # Email & Password are required by default.

#     objects = CustomUserManager()

#     def __str__(self):
#         return self.email
