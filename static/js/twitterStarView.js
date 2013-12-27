var TwitterStarView = Backbone.View.extend({
	tagName : "div",
	className : "twitter-star",
	initialize: function(options){
		this.template = _.template($("#twitter-star-view-template").html());
		this.render();
	},

	render: function(){
		this.$el.append(this.template(this.model.toJSON()));		
	},

	unRender: function(){
		this.remove();
	}
});
