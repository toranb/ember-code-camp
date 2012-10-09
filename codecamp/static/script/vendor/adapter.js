(function() {
    var get = Ember.get, set = Ember.set;

    DS.DjangoRESTAdapter = DS.RESTAdapter.extend({

        createRecord: function(store, type, record) {
            var json = {}
            , root = this.rootForType(type)
            , score = record.get('score')
            , feedback = record.get('feedback')
            , session_id = record.get('session').get('id')
            , url = type.url.fmt(session_id)
            , data = 'score=%@&feedback=%@&session=%@'.fmt(score, feedback, session_id);

            this.django_ajax(url, "POST", {
                data: data,
                context: this,
                success: function(pre_json) {
                    json[root] = pre_json;
                    this.didCreateRecord(store, type, record, json);
                }
            });
        },

        findMany: function(store, type, ids, parent) {
            var json = {}
            , root = this.rootForType(type)
            , plural = this.pluralize(root)
            , url = type.url.fmt(parent.get('id'));

            this.django_ajax(url, "GET", {
                success: function(pre_json) {
                    json[plural] = pre_json;
                    this.sideload(store, type, json, plural);
                    store.loadMany(type, json[plural]);
                }
            });
        },

        findAll: function(store, type) {
            var json = {}
            , root = this.rootForType(type)
            , plural = this.pluralize(root);

            this.django_ajax(this.buildURL(root), "GET", {
                success: function(pre_json) {
                    json[plural] = pre_json;
                    this.sideload(store, type, json, plural);
                    store.loadMany(type, json[plural]);
                }
            });
        },

        django_ajax: function(url, type, hash) {
            hash.url = url;
            hash.type = type;
            hash.dataType = 'json';
            hash.context = this;

            jQuery.ajax(hash);
        }

    });

})();
