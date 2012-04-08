define([
	// Libs
	"use!backbone"
],

function(Backbone) {
	
	var photo_model = Backbone.Model.extend({
		defaults : {
			name	: '',
			path	: '',
			tags	: []
		},
		
		get_tags_with_anchor : function() {
			if (! _.isUndefined(this.get('tags'))) {
				var res = '';
				_.each(this.get('tags'), function(tag) {
					res += ', <a href="#/tag/' + tag + '">' + tag + '</a>';
				}, this);
				return res;
			} else {
				return '';
			}
		}
	});
	
	return photo_model;
});