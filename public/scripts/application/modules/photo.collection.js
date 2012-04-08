define([
	// Libs
	"use!backbone",
	
	// Modules
	"modules/photo.model"
],

function(Backbone, Photo) {
	
	var photo_collection = Backbone.Collection.extend({
		
		model	: Photo,
		
		url : '/photos',
		
		initialize : function() {
			this.load();
		},
		
		load : function() {
			this.fetch();
		},
		
		parse : function(datas) {
			_.each(datas.rows, function(row) {
				this.add({
					id		: row.id,
					name	: row.value.name,
					path	: row.value.path,
					tags	: row.value.tags
				});
			}, this);
			
			return this.models;
		},
		
		get_tags : function() {
			var tags = this.pluck('tags');
			return _.uniq(_.flatten(tags));
		},
		
		filter_tag : function(tag) {
			return _.filter(this.models, function(el) {
				return _.indexOf(el.get('tags'), tag) > -1;
			});
		},
		
		get_all : function() {
			return this.models;
		}
	});
	
	// Singleton
	return new photo_collection;
});