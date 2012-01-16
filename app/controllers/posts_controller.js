load('application');
before(loadPost, {only: ['show']});
before( use('show_block_content'), { only: [ "show", "index", "showAliasContent" ] } );

function showBlockContent( alias ) {
	this.title = "Block Content";
	BlockContent.all({ where: { permalink: alias } }, function (err, blockcontents) {
		if (err) {
			redirect("/");
//			redirect("page_not_found");
		} else {
			render("../blockcontents/show", {
				title: "Block Content",
				block_content: blockcontents[0]
			});
		}
	}.bind(this));
}

action( 'showAliasContent', function() {
	Post.all( { where: { permalink: params.id } }, function (err, posts) {
		if (err) {
			redirect("/");
//			redirect("page_not_found");
		} else if ( posts.length === 0 ) {
			showBlockContent( params.id );
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