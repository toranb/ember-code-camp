from django.db import models

class Tag(models.Model):
    description = models.CharField(max_length=200)

class Session(models.Model):
    name = models.CharField(max_length=150)
    room = models.CharField(max_length=100)
    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField(auto_now_add=True)
    desc = models.TextField()
    tags = models.ManyToManyField(Tag)

class Speaker(models.Model):
    name = models.CharField(max_length=100)
    web = models.CharField(max_length=250)
    location = models.CharField(max_length=100)
    bio = models.TextField()
    session = models.ForeignKey(Session, related_name='speakers')

class Rating(models.Model):
    score = models.IntegerField()
    feedback = models.CharField(max_length=140)
    session = models.ForeignKey(Session, related_name='ratings')
