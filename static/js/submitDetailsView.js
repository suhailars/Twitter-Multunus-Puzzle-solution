var SubmitDetailsView = Backbone.View.extend({
	id: "submit-details-overlay",
	className : "submit-details-overlay overlay-container",
	initialize: function(options){
		this.template = _.template($("#submit-details-overlay-template").html());
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