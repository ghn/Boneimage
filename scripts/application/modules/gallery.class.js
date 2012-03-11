define([
	// Libs
	"use!backbone",
	
	// i18n
	"i18n!nls/lang",
	
	// templates
	"text!templates/gallery/list.html",
	"text!templates/gallery/sidebar.html"
],

function(Backbone, lang, galleryTemplate, sidebarTemplate) {
	
	var galleryModel = Backbone.Model.extend({
		defaults : {
			name : 'a name',
			path : 'a path',
			tags : []
		}
	});

	var galleryCollection = Backbone.Collection.extend({
		model	: galleryModel,
		
		url : 'gallery',
	
		initialize : function() {
			this.template = new galleryView({model : this});
			
			// demo datas
			this.add([{
				name : 'woman',
				path : 'images/01.jpg',
				tags : ['woman', 'black and white', 'vintage']
			}, {
				name : 'phone',
				path : 'images/02.jpg',
				tags : ['phone', 'old fashion', 'colours', 'vintage']
			}, {
				name : 'street',
				path : 'images/03.jpg',
				tags : ['street', 'black and white', 'vintage']
			}, {
				name : 'Colours',
				path : 'images/04.jpg',
				tags : ['colours', 'vintage']
			}]);
			
			this.fetch();
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
			return _.filter(this.models, function(el) {
				return true;
			});
		}
	});

	var galleryView = Backbone.View.extend({
	
		el : {
			gallery : $('#gallery'),
			sidebar : $('#sidebar')
		},
	
		template: {
			gallery : '',
			sidebar : ''
		},
		
		initialize : function() {
			this.template.gallery = _.template(galleryTemplate);
			this.template.sidebar = _.template(sidebarTemplate);
		},
	
		render : function() {
			$(this.el.gallery).html( this.template.gallery({images : this.model.get_all()}) );
			$(this.el.sidebar).html( this.template.sidebar({tags : this.model.get_tags()}) );
		},
		
		render_tag : function(tag) {
			$(this.el.gallery).html( this.template.gallery({images : this.model.filter_tag(tag)}) );
		}
	});
	
	// !! important !! -> the collection manage the view!
	return galleryCollection;
});