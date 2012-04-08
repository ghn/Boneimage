define([
	
	// Libs
	"use!backbone"
],

function(Backbone) {

	/**
	 *	Main controllers
	 */
	var AppRouter = Backbone.Router.extend({
		routes: {
			""				: "gallery",
			"/"				: "gallery",
			"/tag/:tag_name": "tag_related"
		},
		
		initialize : function() {},
	
		gallery : function() {
			require(["pages/gallery.class"], function(gallery) {
				gallery.render();
			});
		},
		
		tag_related : function(tag) {
			require(["pages/gallery.class"], function(gallery) {
				gallery.render_tag(tag);
			});
		}
	});

	// Singleton
	return new AppRouter;
});