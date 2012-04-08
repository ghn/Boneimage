require([
	
	// Libs
	"use!backbone",
	
	// Modules
	"controllers/router.class"
],

function(Backbone, router) {
	// Start Backbone history a neccesary step for bookmarkable URL's
	Backbone.history.start();
});
