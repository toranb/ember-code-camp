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
        router.get('applicationController').connectOutlet('sessions', CodeCamp.SessionsRepository.findAll());
      }
    })
  })
});

CodeCamp.SessionsRepository = Ember.Object.create({
  sessions: [],
  url: 'http://localhost:8000/sessions',
  findAll: function() {
    var self = this;
    $.getJSON(self.url, function(response) {
      response.forEach(function(data) {
        var session = CodeCamp.Session.create({ name: data['name'] });
        self.sessions.pushObject(session);
      }, this);
    });
    return self.sessions;
  }
});

CodeCamp.initialize();
