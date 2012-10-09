CodeCamp = Ember.Application.create();

CodeCamp.ApplicationController = Ember.ObjectController.extend();

CodeCamp.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

CodeCamp.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/'
    })
  })
});

CodeCamp.initialize();
