CodeCamp = Ember.Application.create();

CodeCamp.ApplicationController = Ember.ObjectController.extend();

CodeCamp.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

CodeCamp.Session = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string'),
  speakers: DS.hasMany('CodeCamp.Speaker')
});

CodeCamp.Speaker = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string'),
  session: DS.belongsTo('CodeCamp.Session')
});

CodeCamp.Speaker.reopenClass({
  url: 'sessions/%@/speakers/'
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