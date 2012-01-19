load('application');
before(use('requireLogin'));
before(loadPost, {only: ['show', 'edit', 'update', 'destroy']});
layout('admin');
var Utils = require( "../../../lib/Utils" );

action('new', function () {
	this.title = 'New Post';
	this.post = new Post;
	this.post.published_date = Utils.formatToDate( Date.now() );
	render();
});

action('create', function() {
	var obj = Utils.merge( body, {
		published_date: Utils.parseDate( body.published_date ),
		published: body.published === "on"
	} );
	User.find( req.session.user_id, function( err, user ) {
		user.posts.create(obj, function (err, post) {
			if (err) {
				flash('error', 'Post can not be created');
				render('new', {
					post: post,
					title: 'New Post'
				});
			} else {
				flash('info', 'Post created');
				redirect(path_to.admin_posts);
			}
		});
	} );
});

action('index', function() {
	this.title = 'Posts';
	Post.all(function (err, posts) {
		User.all( function (err, users) {
			render({
				users: users,
				posts: posts
			});
		});
	});
});

action('show', function() {
	this.title = 'Post Show';
	render();
});

action('edit', function() {
	this.title = 'Post Edit';
	render( {
		post: Utils.merge( this.post, {
			published_date: Utils.formatToDate( this.post.published_date )
		} )
	});
});

action('update', function() {
	var obj = Utils.merge( body, {
		published_date: Utils.parseDate( body.published_date ),
		published: body.published === "on"
	} );
	this.post.updateAttributes(
		obj, function (err) {
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
