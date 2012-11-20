from django.contrib import admin
from codecamp.ember.models import Session, Speaker, Rating, Tag

admin.site.register(Tag)
admin.site.register(Session)
admin.site.register(Speaker)
admin.site.register(Rating)
