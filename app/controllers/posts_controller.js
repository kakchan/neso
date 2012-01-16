load('application');
before(loadPost, {only: ['show']});
before( use('show_block_content'), { only: [ "show", "index", "showAliasContent" ] } );

action( 'showAliasContent', function() {
	Post.all( { where: { permalink: params.id } }, function (err, posts) {
		if (err || posts.length === 0 ) {
			redirect("/");
//			redirect("page_not_found");
		} else {
			var post = posts[0];
			this.title = post.title;
			render("show", {
				post: post
			});
		}
	}.bind(this));
});

action( 'show', function() {
	this.title = "Post";
	render();
});

action( 'index', function() {
	this.title = "Posts";
	Post.all(function(err, posts) {
		render({
			posts: posts
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