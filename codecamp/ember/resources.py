from djangorestframework.resources import ModelResource
from codecamp.ember.models import Session, Speaker, Rating

class SessionResource(ModelResource):
    model = Session
    fields = ('id', 'name', 'room', 'desc', 'speakers', 'ratings')

    def speakers(self, instance):
        return [speaker.pk for speaker in instance.speakers.all()]

    def ratings(self, instance):
        return [rating.pk for rating in instance.ratings.all()]

class SpeakerResource(ModelResource):
    model = Speaker
    fields = ('id', 'name')

class RatingResource(ModelResource):
    model = Rating
    fields = ('id', 'score', 'feedback')
