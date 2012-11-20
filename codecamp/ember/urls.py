from codecamp.ember.views import SessionList, SpeakerList, SpeakerDetail, RatingList, RatingDetail, TagList, TagDetail
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls.defaults import patterns, url, include

urlpatterns = patterns('',
    url(r'^/tags/(?P<pk>\d+)/$', csrf_exempt(TagDetail.as_view())),
    url(r'^/ratings/(?P<pk>\d+)/$', csrf_exempt(RatingDetail.as_view())),
    url(r'^/speakers/(?P<pk>\d+)/$', csrf_exempt(SpeakerDetail.as_view())),
    url(r'^/sessions/(?P<session_pk>\d+)/tags/$', csrf_exempt(TagList.as_view())),
    url(r'^/sessions/(?P<session_pk>\d+)/ratings/$', csrf_exempt(RatingList.as_view())),
    url(r'^/sessions/(?P<session_pk>\d+)/speakers/$', csrf_exempt(SpeakerList.as_view())),
    url(r'^/sessions$', csrf_exempt(SessionList.as_view())),
)
