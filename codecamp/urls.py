from django.conf.urls import patterns, include, url
from django.views.generic.simple import redirect_to
from codecamp.ember.views import HomeView
from django.contrib import admin

from codecamp.ember.views import SessionList, SessionDetail, SpeakerList, SpeakerDetail, RatingList, RatingDetail, TagList, TagDetail, SessionSpeakers, SessionRatings, SessionTags
from django.views.decorators.csrf import csrf_exempt

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', HomeView.as_view()),
    url(r'^codecamp/tags/(?P<pk>\d+)/$', csrf_exempt(TagDetail.as_view()), name='tag-detail'),
    url(r'^codecamp/ratings/(?P<pk>\d+)/$', csrf_exempt(RatingDetail.as_view()), name='rating-detail'),
    url(r'^codecamp/speakers/(?P<pk>\d+)/$', csrf_exempt(SpeakerDetail.as_view()), name='speaker-detail'),
    url(r'^codecamp/sessions/(?P<pk>[0-9]+)/tags/$', csrf_exempt(SessionTags.as_view()), name='session-tags'),
    url(r'^codecamp/sessions/(?P<pk>[0-9]+)/ratings/$', csrf_exempt(SessionRatings.as_view()), name='session-ratings'),
    url(r'^codecamp/sessions/(?P<pk>[0-9]+)/speakers/$', csrf_exempt(SessionSpeakers.as_view()), name='session-speakers'),
    url(r'^codecamp/sessions/(?P<pk>\d+)/$', csrf_exempt(SessionDetail.as_view()), name='session-detail'),
    url(r'^codecamp/tags/$', csrf_exempt(TagList.as_view()), name='tag-list'),
    url(r'^codecamp/ratings/$', csrf_exempt(RatingList.as_view()), name='rating-list'),
    url(r'^codecamp/speakers/$', csrf_exempt(SpeakerList.as_view()), name='speaker-list'),
    url(r'^codecamp/sessions/$', csrf_exempt(SessionList.as_view()), name='session-list'),
)
