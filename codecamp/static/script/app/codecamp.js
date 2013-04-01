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
  revision: 12,
  adapter: DS.DjangoRESTAdapter.create({
      namespace: 'codecamp'
  })
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
  addRating: function(rating) {
    this.get('store').commit();
  }
});

CodeCamp.Router.map(function() {
  this.route("sessions", { path : "/" });
  this.route("session", { path : "/session/:session_id" });
  this.route("speaker", { path : "/speaker/:speaker_id" });
});

CodeCamp.SessionsRoute = Ember.Route.extend({
  model: function() {
    return CodeCamp.Session.find();
  }
});
