from codecamp.ember.views import RatingBySessionList, SessionList, RatingList, TagList, SpeakerList
from django.conf.urls.defaults import patterns, url, include

urlpatterns = patterns('',
    url(r'^/ratings/$', RatingList.as_view()),
    url(r'^/sessions/$', SessionList.as_view()),
    url(r'^/sessions/(?P<session_pk>\d+)/tags/$', TagList.as_view()),
    url(r'^/sessions/(?P<session_pk>\d+)/ratings/$', RatingBySessionList.as_view()),
    url(r'^/sessions/(?P<session_pk>\d+)/speakers/$', SpeakerList.as_view()),
)
