from codecamp.ember.views import SessionsView, SpeakersView, RatingsView
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls.defaults import patterns, url, include

urlpatterns = patterns('',
    url(r'^/(?P<session>\d+)/ratings/$', csrf_exempt(RatingsView.as_view())),
    url(r'^/(?P<session>\d+)/speakers/$', csrf_exempt(SpeakersView.as_view())),
    url(r'^$', csrf_exempt(SessionsView.as_view())),
)
