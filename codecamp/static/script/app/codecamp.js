CodeCamp = Ember.Application.create();

CodeCamp.ApplicationController = Ember.ObjectController.extend();

CodeCamp.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

CodeCamp.Session = Ember.Object.extend({
  name: ''
});

CodeCamp.SessionsView = Ember.View.extend({
  templateName: 'sessions'
});

CodeCamp.SessionsController = Ember.ArrayController.extend({
  content: []
});

CodeCamp.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router, context) {
        router.get('applicationController').connectOutlet('sessions');
      }
    })
  })
});

CodeCamp.initialize();
