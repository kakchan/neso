load('application');
before(use('alreadyLoggedIn'), { only: [ 'index', 'create' ] });

action( 'index', function() {
	this.title = 'Logon';
	render();
} );

action('create', function() {
	if ( req.body.username === "admin" && req.body.password === "admin" ) {
		req.session.user_id = 1;
		redirect(path_to.posts);
	} else {
		flash('logon unsuccessful');
		redirect(path_to.session);
	}
} );

action('destroy', function() {
	delete req.session.user_id;
	redirect(path_to.session);
} );