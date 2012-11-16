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

    def get_queryset(self):
        session_pk = self.kwargs.get('session_pk', None)
        if session_pk is not None:
            return Speaker.objects.filter(session__pk=session_pk)
        return []

class SpeakerDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Speaker
    serializer_class = resources.SpeakerSerializer

class RatingList(generics.ListCreateAPIView):
    model = Rating
    serializer_class = resources.RatingSerializer

    def get_queryset(self):
        session_pk = self.kwargs.get('session_pk', None)
        if session_pk is not None:
            return Rating.objects.filter(session__pk=session_pk)
        return []

class RatingDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Rating
    serializer_class = resources.RatingSerializer
