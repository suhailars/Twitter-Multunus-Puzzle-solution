var InfluencesView = Backbone.View.extend({
	id: 'influences-wrapper',
	className: 'influences-wrapper',
	initialize: function(options){
		options = options || {};
		this.template = _.template($("#influences-view-template").html());
		this.twitterUsers = options.collection;
		this.twitterUsers = this.twitterUsers || new TwitterUsers([]);
		this.profileImage = options.profileImage || "";
		this.userId = options.userId;
		this.render();
	},
	events: {
		'click .find-out-more-link': 'showHideHintsOverlay',
		'click .show-submit-details-link': 'showHideSubmitDetailsOverlay'
	},
	render: function(){
		if (currentView) {
			currentView.unRender();
		}
		this.$el.html(this.template({profile_image_url : this.profileImage}));
		this.showUsers();
		this.initializeRadMenu();
	},

	showUsers: function(){
		var self = this;
		this.twitterUsers.each(function(twitterUser){
			var tempInfluenceView = new InfluenceView({model: twitterUser});
			self.$el.find(".influence-collection").append(tempInfluenceView.$el);
		});
	},
	initializePopOver :function(){
		$(".infulence-image").popover();
	},
	initializeRadMenu :function(){
		this.$el.radmenu({
            listClass: 'influence-collection',
            itemClass: 'influence',
            radius: 220,
            animSpeed:800,
            centerX: 250,
            centerY: 250,
            angleOffset: -90
        });
        this.$el.radmenu("show");
	},
	unRender: function(){
          this.remove();
	},
	showHideHintsOverlay: function(event) {
		var self = this;
		event.preventDefault();
		this.closeOverlayView();
		this.overlayView = new HintsView();
		this.overlayView.render();

		this.starTweets = new StarTweets();
		this.starTweets.fetch({
			url : "/twitter_users/"+self.userId+"/star_tweets.json",
			success : function() {
				self.loadStarTweets();
			}
		});
	},
	showHideSubmitDetailsOverlay: function() {
		var self = this;
		this.closeOverlayView();
		this.overlayView = new SubmitDetailsView();
		this.overlayView.render();
	},
	loadStarTweets: function(){
		var self = this;
		this.starTweets.each(function(starTweet){
			var tweet = $("<a class='star-tweet' target='_blank'></a>").attr('href',starTweet.get('tweet_link')).text(starTweet.get('tweet_text'));
			self.overlayView.$(".hints-tweets-container").append(tweet);
		});
	},
	closeOverlayView: function(){
		if(this.overlayView){
			this.overlayView.unRender();
			this.overlayView = null;
		}
	}
});
