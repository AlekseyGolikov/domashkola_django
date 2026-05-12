from django.contrib import admin
from accounts.models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'first_name', 'last_name', 'status', 'is_staff', 'is_active', 'date_joined', 'last_login')

admin.site.register(User, UserAdmin)
