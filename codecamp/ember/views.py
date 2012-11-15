from django.views.generic import TemplateView
from codecamp.ember import resources
from rest_framework import generics
from codecamp.ember.models import Session, Speaker, Rating

class HomeView(TemplateView):
    template_name = 'index.html'

class SessionList(generics.ListCreateAPIView):
    model = Session
    serializer_class = resources.SessionSerializer

class SpeakerList(generics.ListCreateAPIView):
    model = Speaker
    serializer_class = resources.SpeakerSerializer

class SpeakerDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Speaker
    serializer_class = resources.SpeakerSerializer

class RatingList(generics.ListCreateAPIView):
    model = Rating
    serializer_class = resources.RatingSerializer

class RatingDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Rating
    serializer_class = resources.RatingSerializer
