var TwitterInfluencePuzzle = Backbone.Router.extend({

	routes : {
	    "" : "home",
		"twitter_handles/:user_id/*path" : "influences",
                "*notFound" : "notFound"
	},

        notFound : function(){
          var errorMessageView = new ErrorMessageView();
          $('body').append(errorMessageView.$el);
          currentView = errorMessageView;
        },

        displayErrorPage: function() {
	    $('body').append('<div class="custom-error"><p>This puzzle is now broken :(</p><p>Come back in a couple of days and it should be back up by then.</p><p>Thanks for your patience.Send any queries to <a href="mailto:info@multunus.com">info@multunus.com </a></p></div>');
        },

	home : function() {
		self = this;
		if (currentView) {
			currentView.unRender();
		}
		var twitterUsers = new TwitterUsers([]);
		twitterUsers.fetch({
			success : function() {
				var twitterStarsView = new TwitterStarsView({
					collection : twitterUsers
				});
				$('body').append(twitterStarsView.$el);
				currentView = twitterStarsView;
				self.fixAspectRatio();
			}
		});
	},

	fixAspectRatio: function(){
		var image_width = 	$('.twitter-star').first().width();
		$.each(
	    $('.twitter-star a'),
	    function(index,value){
	      $(value).css('height',image_width); 
	      $(value).css('width',image_width);
	    }
  	)
	},

	influences : function(user_id, profile_image) {
		if (currentView) {
			currentView.unRender();
			var loadingMessageView = new LoadingMessageView();
			loadingMessageView.render();
		}
		var twitterUsers = new TwitterUsers([]);
		var influencersUrl = "/twitter_users/" + user_id + "/influencers.json";
	  var profileImage = profile_image;
		twitterUsers.fetch({
			url : influencersUrl,
			success : function() {
				var influencesView = new InfluencesView({
					collection : twitterUsers,
					profileImage : profileImage,
					userId: user_id
				});
				$('body').append(influencesView.$el);
				influencesView.initializePopOver();
				currentView = influencesView;
			}
		});

	}
});
