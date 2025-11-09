from django.contrib import admin
from .models import Content, Grades, Subjects, Presentation, FormatData


class ContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'grade_id', 'subject_id', 'presentation_id', 'formatData_id', 'content', 'title', 'link', 'timestamp')


class GradesAdmin(admin.ModelAdmin):
    list_display = ('id', 'grade_code', 'grade_name')


class SubjectsAdmin(admin.ModelAdmin):
    list_display = ('id', 'subject_code', 'subject_name')


class PresentationAdmin(admin.ModelAdmin):
    list_display = ('id', 'presentation_code', 'presentation_name')


class FormatDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'format_code', 'format_name')


admin.site.register(Content, ContentAdmin)
admin.site.register(Grades, GradesAdmin)
admin.site.register(Subjects, SubjectsAdmin)
admin.site.register(Presentation, PresentationAdmin)
admin.site.register(FormatData, FormatDataAdmin)
