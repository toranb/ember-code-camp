(function() {
    var get = Ember.get;

    DS.DjangoRESTSerializer = DS.RESTSerializer.extend({

        keyForBelongsTo: function(type, name) {
            return this.keyForAttributeName(type, name);
        },

        addBelongsTo: function(hash, record, key, relationship) {
            var id = get(record, relationship.key+'.id');

            if (!Ember.isNone(id)) {
                hash[key] = id;
                record['parent_key'] = relationship.key;
                record['parent_value'] = id;
            }
        }
    });

})();
