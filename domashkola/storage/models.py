from django.db import models

class Content(models.Model):
    grade = models.CharField(max_length=20)
    subject = models.CharField(max_length=35)
    presentation = models.CharField(max_length=30)
    formatData = models.CharField(max_length=20)
    content = models.TextField()
    timestamp = models.DateTimeField()

class Grades(models.Model):
    grade_name = models.CharField(max_length=20)
    grade_code = models.CharField(max_length=3)

class Subjects(models.Model):
    subject_name = models.CharField(max_length=35)
    subject_code = models.CharField(max_length=10)

class Presentation(models.Model):
    presentation_name = models.CharField(max_length=20)
    presentation_code = models.CharField(max_length=10)

class FormatData(models.Model):
    format_name = models.CharField(max_length=20)
    format_code = models.CharField(max_length=10)
