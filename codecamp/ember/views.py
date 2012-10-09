from django.views.generic import TemplateView
from djangorestframework import views
from djangorestframework import mixins
from codecamp.ember import resources

class HomeView(TemplateView):
    template_name = 'index.html'

class SessionsView(views.ListOrCreateModelView):
    resource = resources.SessionResource

class SpeakersView(views.ListOrCreateModelView):
    resource = resources.SpeakerResource

class RatingsView(views.ListOrCreateModelView):
    resource = resources.RatingResource
