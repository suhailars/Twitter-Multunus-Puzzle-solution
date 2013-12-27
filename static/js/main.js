var setBackgroundImage = function(){
	$(document).bgStretcher({
	images: ['img/watch_org.jpg'], imageWidth: 1440, imageHeight: 1080
	});
};

$(function(){
	//setBackgroundImage();
	currentView = null;
	var app = new TwitterInfluencePuzzle();
	Backbone.history.start();
//	app.navigate("home", {trigger: true});
	/*var influencesView = new InfluencesView();
    $('body').append(influencesView.$el);*/
});
//Fix Image aspect ratio - Responsive
$(window).ready(function(){
	$(window).resize(self.fixAspectRatio);
});
