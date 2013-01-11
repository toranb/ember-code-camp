from codecamp.ember.views import SessionList, SessionDetail, SpeakerList, SpeakerDetail, RatingList, RatingDetail, TagList, TagDetail
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls.defaults import patterns, url, include

urlpatterns = patterns('',
    url(r'^/tags/(?P<pk>\d+)/$', csrf_exempt(TagDetail.as_view()), name='tag-detail'),
    url(r'^/ratings/(?P<pk>\d+)/$', csrf_exempt(RatingDetail.as_view()), name='rating-detail'),
    url(r'^/speakers/(?P<pk>\d+)/$', csrf_exempt(SpeakerDetail.as_view()), name='speaker-detail'),
    url(r'^/sessions/(?P<session_pk>\d+)/tags/$', csrf_exempt(TagList.as_view()), name='tag-list'),
    url(r'^/sessions/(?P<session_pk>\d+)/ratings/$', csrf_exempt(RatingList.as_view()), name='rating-list'),
    url(r'^/sessions/(?P<session_pk>\d+)/speakers/$', csrf_exempt(SpeakerList.as_view()), name='speaker-list'),
    url(r'^/sessions/(?P<pk>\d+)/$', csrf_exempt(SessionDetail.as_view()), name='session-detail'),
    url(r'^/sessions/$', csrf_exempt(SessionList.as_view()), name='session-list'),
)
