(function() {
    var get = Ember.get;

    DS.DjangoRESTSerializer = DS.RESTSerializer.extend({

        keyForBelongsTo: function(type, name) {
            return this.keyForAttributeName(type, name) + "";
        }

    });

})();
