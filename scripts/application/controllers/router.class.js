define([
	
	// Libs
	"use!backbone",
	
	// modules
	"modules/gallery.class"
],

function(Backbone, galleryModule) {

	/**
	 *	Main controllers
	 */
	var AppRouter = Backbone.Router.extend({
		routes: {
			""				: "gallery",
			"/"				: "gallery",
			"/tag/:tag_name": "tag_related"
		},
	
		pages : {
			default_page : null
		},
	
		initialize : function() {
			this.pages.gallery = new galleryModule;
		},
	
		gallery : function() {
			this.pages.gallery.template.render();
		},
		
		tag_related : function(tag) {
			this.pages.gallery.template.render_tag(tag);
		}
	});

	// !! important !!
	return AppRouter;
});