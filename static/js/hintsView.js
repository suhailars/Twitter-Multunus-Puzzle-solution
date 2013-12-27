var HintsView = Backbone.View.extend({
	id: "hints-overlay",
	className : "hints-overlay overlay-container",
	initialize: function(options){
		this.template = _.template($("#hints-overlay-template").html());
	},
	events: {
		'click .close-overlay' : 'unRender'
	},
	render: function(){
		this.$el.html(this.template);
		$('body').append(this.$el);
		this.showing = true;
	},

	unRender: function(){
		this.remove();
	}
});