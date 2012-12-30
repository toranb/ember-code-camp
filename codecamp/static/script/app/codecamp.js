CodeCamp = Ember.Application.create();
CodeCamp.ApplicationController = Ember.ObjectController.extend();
CodeCamp.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

CodeCamp.Session = DS.Model.extend({
  name: DS.attr('string'),
  speakers: DS.hasMany('CodeCamp.Speaker'),
  ratings: DS.hasMany('CodeCamp.Rating'),
  tags: DS.hasMany('CodeCamp.Tag')
});

CodeCamp.Speaker = DS.Model.extend({
  name: DS.attr('string'),
  session: DS.belongsTo('CodeCamp.Session')
}).reopenClass({
  url: 'codecamp/sessions/%@/speakers/'
});

CodeCamp.Rating = DS.Model.extend({
  score: DS.attr('number'),
  feedback: DS.attr('string'),
  session: DS.belongsTo('CodeCamp.Session')
}).reopenClass({
  url: 'codecamp/sessions/%@/ratings/'
});

CodeCamp.Tag = DS.Model.extend({
  description: DS.attr('string')
}).reopenClass({
  url: 'codecamp/sessions/%@/tags/'
});

CodeCamp.Store = DS.Store.extend({
  revision: 10,
  adapter: DS.DjangoRESTAdapter.create()
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

CodeCamp.initialize();
