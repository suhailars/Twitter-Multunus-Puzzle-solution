var LoadingMessageView = Backbone.View.extend({
	className : "loading-container container-fluid content-main-page",
	initialize: function(options){
		this.template = _.template($("#loading-message-template").html());
		this.$el.html(this.template);
	},

	render: function(){
		currentView = this;
		$('body').append(this.$el);
	},

	unRender: function(){
		this.remove();
	}
});
