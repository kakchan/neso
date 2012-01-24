load('application');
before(use('requireLogin'));
before(loadPost, {only: ['show', 'edit', 'update', 'destroy']});
layout('admin');
var nesoUtils = require( "../../../lib/neso-utils" )
		fs = require( "fs" );

action('new', function () {
	this.title = 'New Post';
	this.post = new Post;
	this.post.published_date = nesoUtils.formatToDate( Date.now() );
	render();
});

action('create', function() {
	var obj = nesoUtils.merge( body, {
		published_date: nesoUtils.parseDate( body.published_date ),
		published: body.published === "on"
	} );
	User.find( req.session.user_id, function( err, user ) {
		if (err) {
			flash('error', 'Post can not be created');
			redirect(path_to.admin_posts);
		} else {
			user.posts.create(obj, function (err, post) {
				if (err) {
					flash('error', 'Post can not be created');
					render('new', {
						post: post,
						title: 'New Post'
					});
				} else {
					renameThumbnailFile( post );
					flash('info', 'Post created');
					redirect(path_to.admin_posts);
				}
			});
		}
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
		post: nesoUtils.merge( this.post, {
			published_date: nesoUtils.formatToDate( this.post.published_date )
		} )
	});
});

action('update', function() {
	var obj = nesoUtils.merge( body, {
		published_date: nesoUtils.parseDate( body.published_date ),
		published: body.published === "on"
	} );
	this.post.updateAttributes(
		obj, function (err) {
		if (err) {
			flash('error', 'Post can not be updated');
			this.title = 'Edit post details';
			render('edit');
		} else {
			renameThumbnailFile( this.post );
			flash('info', 'Post Updated');
			redirect(path_to.admin_posts);
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

function renameThumbnailFile( post ) {
	var thumbnail = req.files.thumbnail;
	var filename = post.id + "." + thumbnail.name.split(".")[1];
	fs.rename( thumbnail.path, "public/uploaded/posts/" + filename );
	post.thumbnail_filename = filename;
	post.save();
}
