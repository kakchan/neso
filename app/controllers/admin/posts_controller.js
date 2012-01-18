load('application');
before(use('requireLogin'));
before(loadPost, {only: ['show', 'edit', 'update', 'destroy']});
layout('admin');

action('new', function () {
	this.title = 'New Post';
	this.post = new Post;
	render();
});

action('create', function() {
	Post.create(req.body, function (err, user) {
		if (err) {
			flash('error', 'Post can not be created');
			render('new', {
				post: user,
				title: 'New post'
			});
		} else {
			flash('info', 'Post created');
			redirect(path_to.admin_posts);
		}
	});
});

action('index', function() {
	this.title = 'Posts';
	Post.all(function (err, posts) {
		render({
			posts: posts
		});
	});
});

action('show', function() {
	this.title = 'Post Show';
	render();
});

action('edit', function() {
	this.title = 'Post Edit';
	render();
});

action('update', function() {
	this.post.updateAttributes(body, function (err) {
		if (!err) {
			flash('info', 'Post Updated');
			redirect(path_to.admin_posts);
		} else {
			flash('error', 'Post can not be updated');
			this.title = 'Edit post details';
			render('edit');
		}
	}.bind(this));
});

action('destroy', function() {
	this.post.destroy(function (error) {
		if (error) {
			flash('error', 'Can not destroy post');
		} else {
			flash('info', 'Post successfully removed');
		}
		send("'" + path_to.admin_posts + "'");
	});
});

/* Public Methods */
function loadPost() {
	Post.find(params.id, function (err, post) {
		if (err) {
			redirect(path_to.admin_posts);
		} else {
			this.post = post;
			next();
		}
	}.bind(this));
}
