var TwitterStarsView = Backbone.View.extend({
	className: "content-main-page",
	initialize: function(options){
		options = options || {};
		this.template = _.template($("#twitter-stars-view-template").html());
		this.twitterUsers = options.collection;
		this.twitterUsers = this.twitterUsers || new TwitterUsers([]);
		this.render();
	},

	render: function(){
		this.$el.append(this.template({}));
		this.showUsers();
	},

	showUsers: function(){
		var self = this;
		this.twitterUsers.each(function(twitterUser){
			var twitterStarView = new TwitterStarView({model: twitterUser});
			self.$("#twitter-stars-container").append(twitterStarView.$el);
		});
	},

	unRender: function(){
		    $(window).unbind("resize");
		    this.$el.unbind();
            this.$el.remove();
	}
});
