load('application');
before(use('alreadyLoggedIn'), { only: [ 'index', 'create' ] });

var crypto = require('ezcrypto').Crypto;

action( 'index', function() {
	this.title = 'Logon';
	render();
} );

action('create', function() {
	User.all( {
		where: {
			username: req.body.username,
			password: crypto.SHA256( req.body.password)
		}
	}, function( err, users ) {
		if ( users.length > 0  && !err) {
			req.session.user_id = users[0].id;
			redirect(path_to.posts);
		} else {
			flash('error', 'logon unsuccessful');
			redirect(path_to.session);
		}
	} );
} );

action('destroy', function() {
	delete req.session.user_id;
	redirect(path_to.session);
} );