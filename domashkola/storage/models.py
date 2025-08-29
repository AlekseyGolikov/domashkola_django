from django.db import models

class Content(models.Model):
    grade = models.CharField(max_length=3)
    subject = models.CharField(max_length=10)
    presentation = models.CharField(max_length=10)
    formatData = models.CharField(max_length=10)
    content = models.TextField()
    timestamp = models.DateTimeField()
