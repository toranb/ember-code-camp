(function() {
    var get = Ember.get, set = Ember.set;

    DS.DjangoRESTAdapter = DS.RESTAdapter.extend({

        bulkCommit: false,

        serializer: DS.DjangoRESTSerializer,

        createRecord: function(store, type, record) {
            var json = {}
            , root = this.rootForType(type)
            , session_id = record.get('session').get('id')
            , url = type.url.fmt(session_id)
            , data  = record.serialize();

            this.ajax(url, "POST", {
                data: data,
                context: this,
                success: function(pre_json) {
                    json[root] = pre_json;
                    Ember.run(this, function(){
                        this.didCreateRecord(store, type, record, json);
                    });
                },
                error: function(xhr) {
                    this.didError(store, type, record, xhr);
                }
            });
        },

        findMany: function(store, type, ids, parent) {
            var root = this.rootForType(type);
            ids = this.serializeIds(ids);

            var plural = this.pluralize(root)
            , json = {}
            , url = type.url.fmt(parent.get('id'));

            this.ajax(url, "GET", {
                success: function(pre_json) {
                    json[plural] = pre_json;
                    Ember.run(this, function(){
                        this.didFindMany(store, type, json);
                    });
                }
            });
        },

        findAll: function(store, type, since) {
            var root = this.rootForType(type)
            , plural = this.pluralize(root)
            , json = {};

            this.ajax(this.buildURL(root), "GET", {
                data: this.sinceQuery(since),
                success: function(pre_json) {
                    json[plural] = pre_json;
                    Ember.run(this, function(){
                        this.didFindAll(store, type, json);
                    });
                }
            });
        },

        ajax: function(url, type, hash) {
            hash.url = url;
            hash.type = type;
            hash.dataType = 'json';
            hash.context = this;

            jQuery.ajax(hash);
        }

    });

})();
