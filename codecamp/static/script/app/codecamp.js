CodeCamp = Ember.Application.create();

CodeCamp.Session = DS.Model.extend({
  name: DS.attr('string'),
  speakers: DS.hasMany('CodeCamp.Speaker'),
  ratings: DS.hasMany('CodeCamp.Rating'),
  tags: DS.hasMany('CodeCamp.Tag')
});

CodeCamp.Speaker = DS.Model.extend({
  name: DS.attr('string'),
  session: DS.belongsTo('CodeCamp.Session')
});

CodeCamp.Rating = DS.Model.extend({
  score: DS.attr('number'),
  feedback: DS.attr('string'),
  session: DS.belongsTo('CodeCamp.Session')
});

CodeCamp.Tag = DS.Model.extend({
  description: DS.attr('string')
});

CodeCamp.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.DjangoRESTAdapter.create({
      namespace: 'codecamp'
  })
});

CodeCamp.SessionsController = Ember.ArrayController.extend({
  content: []
});

CodeCamp.SessionView = Ember.View.extend({
  templateName: 'session',
  addRating: function(event) {
    if (this.formIsValid()) {
      var rating = this.buildRatingFromInputs(event);
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
  formIsValid: function() {
    var score = this.get('score');
    var feedback = this.get('feedback');
    if (score === undefined || feedback === undefined || score.trim() === "" || feedback.trim() === "") {
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
    this.get('store').commit();
  }
});

CodeCamp.Router.map(function(match) {
  match("/").to("sessions");
  match("/session/:session_id").to("session");
  match("/speaker/:speaker_id").to("speaker");
});

CodeCamp.SessionRoute = Ember.Route.extend({
  model: function(params) {
      return CodeCamp.Session.find(params.session_id);
  }
});

CodeCamp.SessionsRoute = Ember.Route.extend({
  setupController: function(controller) {
    controller.set('content', CodeCamp.Session.find());
  }
});

CodeCamp.initialize();

//the above isn't needed for production code anymore, but my test code
//won't work w/out it ... so I put this back in until I find a work around
