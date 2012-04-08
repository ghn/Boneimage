define([
	// Libs
	"use!backbone",
	
	// Modules
	"modules/photo.collection",
	
	// templates
	"text!templates/gallery/list.html",
	"text!templates/gallery/sidebar.html"
],

function(Backbone, Photos, galleryTemplate, sidebarTemplate) {
	
	var GalleryView = Backbone.View.extend({
	
		el : $('#gallery'),
		
		elem : {
			sidebar : $('#sidebar')
		},

		template: {
			gallery : _.template(galleryTemplate),
			sidebar : _.template(sidebarTemplate)
		},
		
		events : {
			'click button.reload'	: 'render'
		},
		
		initialize : function() {},
		
		render : function() {
			$(this.el).html( this.template.gallery({images : Photos.get_all()}) );
			$(this.elem.sidebar).html( this.template.sidebar({tags : Photos.get_tags()}) );
		},

		render_tag : function(tag) {
			$(this.el).html( this.template.gallery({images : Photos.filter_tag(tag)}) );
		}
	});
	
	// Singleton
	return new GalleryView;
});