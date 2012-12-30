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
  adapter: DS.DjangoRESTAdapter.create()
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
    if (this.validForm()) {
      var rating = this.buildRatingFromInputs(event.context);
      this.get('controller').addRating(rating);
      this.resetForm();
    }
  },
  buildRatingFromInputs: function(session) {
      var score = this.get('score');
      var feedback = this.get('feedback');
      return CodeCamp.Rating.createRecord(
      { score: score,
        feedback: feedback, 
        session: session 
      });
  },
  validForm: function() {
    var score = this.get('score');
    var feedback = this.get('feedback');
    if (score === "" || feedback === "") {
      return false;
    }
    return true;
  },
  resetForm: function() {
    this.set('score', '');
    this.set('feedback', '');
  }
});

CodeCamp.SessionController = Ember.ObjectController.extend({
  content: null,
  addRating: function(rating) {
    this.content.get('ratings').pushObject(rating);
    CodeCamp.Session.all().get('store').commit();
  }

});

CodeCamp.SpeakerView = Ember.View.extend({
  templateName: 'speaker'
});

CodeCamp.SpeakerController = Ember.ObjectController.extend({
  content: null
});

CodeCamp.Router.map(function(match) {
    match("/").to("sessions");
    match("/session/:session_id").to("session");
    match("/speaker/:speaker_id").to("speaker");
});

CodeCamp.SessionsRoute = Ember.Route.extend({
    setupControllers: function(controller) {
        controller.set('content', CodeCamp.Session.find());
    }
});

CodeCamp.SessionRoute = Ember.Route.extend({
    setupControllers: function(controller, session) {
        controller.set('content', session);
    }
});

CodeCamp.SpeakerRoute = Ember.Route.extend({
    setupControllers: function(controller, speaker) {
        controller.set('content', speaker);
    }
});

CodeCamp.initialize();
