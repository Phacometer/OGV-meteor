Template.comment.helpers({
    submittedText: function() {
	return new Date(this.submitted).toString();
    }
});


Template.commentSubmit.events({
    'submit form': function(e, template) {
	e.preventDefault();
	    var $body = $(e.target).find('[name=body]');
	    var comment = {
		body: $body.val(),
		postId: this._id
	    };
    
	    Meteor.call('comment', comment, function(error, commentId) {
		if (error){
		    throwError(error.reason);
		} else {
		    $body.val('');
		}
	   });
    }
});


Template.comments.helpers({
    comments: function() 
    {
	return Comments.find({postId:this._id});
    }
});


Template.comments.events({
    'click .comments-header':function(e,t)
    {
	console.log(e);
	$header = $(e.currentTarget);

	$content = $header.next();
	$content.slideToggle(500, function () {
	    $('.comments-header-text').text(function () {
		return $content.is(":visible") ? "Hide Comments" : "Show Comments";
	    });
	});
    }
});        