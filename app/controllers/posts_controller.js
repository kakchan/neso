load('application');
before(loadPost, {only: ['show']});

action( 'show', function() {
	this.title = "Post";
	render();
});

action( 'index', function() {
	this.title = "Posts";
	Post.all(function(err, posts) {
		BlockContent.all( function( err, block_contents ) {
			render({
				posts: posts,
				block_contents: block_contents
			});
		});
	});
} );

/* Public Methods */
function loadPost() {
	Post.find(params.id, function (err, post) {
		if (err) {
			redirect(path_to.posts);
		} else {
			this.post = post;
			next();
		}
	}.bind(this));
}