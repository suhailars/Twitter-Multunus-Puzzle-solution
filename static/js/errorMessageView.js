var ErrorMessageView = Backbone.View.extend({
	initialize: function(options){
	  this.template = _.template($("#error-msg-view-template").html());
          this.render();
	},

	render: function(){
          this.$el.append(this.template)         
        },

	unRender: function(){
	  this.remove();
	}
});
