CodeCamp = Ember.Application.create();

CodeCamp.ApplicationController = Ember.ObjectController.extend();

CodeCamp.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

CodeCamp.Session = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string')
});

CodeCamp.Store = DS.Store.extend({
  revision: 4,
  adapter: DS.DjangoRESTAdapter.create({
    bulkCommit: false
  })
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
        router.get('applicationController').connectOutlet('sessions', router.get('store').findAll(CodeCamp.Session));
      }
    })
  })
});

CodeCamp.initialize();
