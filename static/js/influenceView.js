var InfluenceView = Backbone.View.extend({
	className : "influence",
	initialize: function(options){
		this.template = _.template($("#influence-view-template").html());
		this.render();
	},

	render: function(){
		this.$el.append(this.template(this.model.toJSON()));		
	},

	unRender: function(){
		this.remove();
	}
});
