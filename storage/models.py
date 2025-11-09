from django.db import models
import textwrap


class Grades(models.Model):
    grade_name = models.CharField(max_length=50)
    grade_code = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return str(self.id)+' | '+self.grade_code+' | '+self.grade_name+'\n'


class Subjects(models.Model):
    subject_name = models.CharField(max_length=50)
    subject_code = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return str(self.id)+' | '+self.subject_code+' | '+self.subject_name+'\n'


class Presentation(models.Model):
    presentation_name = models.CharField(max_length=50)
    presentation_code = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return str(self.id)+' | '+self.presentation_code+' | '+self.presentation_name+'\n'


class FormatData(models.Model):
    format_name = models.CharField(max_length=50)
    format_code = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return str(self.id)+' | '+self.format_code+' | '+self.format_name+'\n'


class Content(models.Model):
    title = models.TextField(null=False, blank=True)    # null=False blank=True - поле обязательно для заполнения в БД и необязательно при валидации форм
    content = models.TextField(null=False, blank=False)
    link = models.TextField(null=False, blank=True)
    timestamp = models.DateTimeField()

    grade = models.ForeignKey(Grades, on_delete=models.SET_NULL, null=True, to_field='grade_code')
    subject = models.ForeignKey(Subjects, on_delete=models.SET_NULL, null=True, to_field='subject_code')
    presentation = models.ForeignKey(Presentation, on_delete=models.SET_NULL, null=True, to_field='presentation_code')
    formatData = models.ForeignKey(FormatData, on_delete=models.SET_NULL, null=True, to_field='format_code')
    def __str__(self):
        return str(self.id)+' | '+str(self.grade_id)+' | '+str(self.subject_id)+' | '+str(self.presentation_id)+' | '+str(self.formatData_id)+' | '+str(self.timestamp)+' | '+textwrap.shorten(self.content, width=20, placeholder="...")+'\n'

