CodeCamp = Ember.Application.create();

CodeCamp.ApplicationController = Ember.ObjectController.extend();

CodeCamp.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

CodeCamp.Tag = DS.Model.extend({
  description: DS.attr('string')
});

CodeCamp.Tag.reopenClass({
  url: 'codecamp/sessions/%@/tags/'
});

CodeCamp.Session = DS.Model.extend({
  name: DS.attr('string'),
  speakers: DS.hasMany('CodeCamp.Speaker'),
  ratings: DS.hasMany('CodeCamp.Rating'),
  tags: DS.hasMany('CodeCamp.Tag')
});

CodeCamp.Session.reopenClass({
  url: 'codecamp/session'
});

CodeCamp.Speaker = DS.Model.extend({
  name: DS.attr('string'),
  session: DS.belongsTo('CodeCamp.Session')
});

CodeCamp.Speaker.reopenClass({
  url: 'codecamp/sessions/%@/speakers/'
});

CodeCamp.Rating = DS.Model.extend({
  score: DS.attr('number'),
  feedback: DS.attr('string'),
  session: DS.belongsTo('CodeCamp.Session')
});

CodeCamp.Rating.reopenClass({
  url: 'codecamp/sessions/%@/ratings/'
});

CodeCamp.Store = DS.Store.extend({
  revision: 10,
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

CodeCamp.SessionView = Ember.View.extend({
  templateName: 'session',
  addRating: function(event) {
    var session = event.context;
    var score = this.get('score');
    var feedback = this.get('feedback');

    var rating = CodeCamp.Rating.createRecord({ score: score, feedback: feedback, session: session });
    this.get('controller.content').get('ratings').pushObject(rating);
    this.get('controller.target').get('store').commit();

    this.set('score', '');
    this.set('feedback', '');
  }
});

CodeCamp.SessionController = Ember.ObjectController.extend({
  content: null
});

CodeCamp.SpeakerView = Ember.View.extend({
  templateName: 'speaker'
});

CodeCamp.SpeakerController = Ember.ObjectController.extend({
  content: null
});

CodeCamp.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      showSessionDetails: Ember.Route.transitionTo('sessionDetails'),
      showSpeakerDetails: Ember.Route.transitionTo('speakerDetails'),
      connectOutlets: function(router, context) {
        router.get('applicationController').connectOutlet('sessions', router.get('store').findAll(CodeCamp.Session));
      },
      index: Ember.Route.extend({
        route: '/'
      }),
      sessionDetails: Ember.Route.extend({
        route: '/session/:session_id',
        connectOutlets: function(router, session) {
          router.get('applicationController').connectOutlet('session', session);
        },
        serialize: function(router, session) {
          return { 'session_id': session.get('id') }
        },
        deserialize: function(router, params) {
          return CodeCamp.Session.find(params['session_id']);
        }
      }),
      speakerDetails: Ember.Route.extend({
        route: '/speaker/:speaker_id',
        connectOutlets: function(router, speaker) {
          router.get('applicationController').connectOutlet('speaker', speaker);
        },
        serialize: function(router, speaker) {
          return { 'speaker_id': speaker.get('id') }
        },
        deserialize: function(router, params) {
          return CodeCamp.Speaker.find(params['speaker_id']);
        }
      })
    })
  })
});

CodeCamp.initialize();
