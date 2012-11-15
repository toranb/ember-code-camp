from rest_framework import serializers
from codecamp.ember.models import Session, Speaker, Rating

class SessionSerializer(serializers.ModelSerializer):
    speakers = serializers.ManyPrimaryKeyRelatedField()
    ratings = serializers.ManyPrimaryKeyRelatedField()

    class Meta:
        model = Session
        fields = ('id', 'name', 'room', 'desc', 'speakers', 'ratings')

class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = ('id', 'name', 'session')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'score', 'feedback', 'session')
