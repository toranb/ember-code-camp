from rest_framework import serializers
from codecamp.ember.models import Session, Speaker, Rating, Tag

class SessionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    url = serializers.HyperlinkedIdentityField(view_name='session-detail')
    speakers = serializers.HyperlinkedIdentityField(view_name='session-speakers')
    ratings = serializers.HyperlinkedIdentityField(view_name='session-ratings')
    tags = serializers.HyperlinkedIdentityField(view_name='session-tags')

    class Meta:
        model = Session
        fields = ('id', 'url', 'name', 'room', 'desc', 'speakers', 'ratings', 'tags')

class TagSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    url = serializers.HyperlinkedIdentityField(view_name='tag-detail')

    class Meta:
        model = Tag
        fields = ('id', 'url', 'description')

class SpeakerSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    url = serializers.HyperlinkedIdentityField(view_name='speaker-detail')
    session = serializers.HyperlinkedRelatedField(view_name='session-detail')

    class Meta:
        model = Speaker
        fields = ('id', 'url', 'name', 'session')

class RatingSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    url = serializers.HyperlinkedIdentityField(view_name='rating-detail')
    session = serializers.HyperlinkedRelatedField(view_name='session-detail')

    class Meta:
        model = Rating
        fields = ('id', 'url', 'score', 'feedback', 'session')
