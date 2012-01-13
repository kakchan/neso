before('protect from forgery', function () {
	protectFromForgery('f56f330058d7051471dbee262800bdb87554ed3f');
});

publish('requireLogin', function () {
	if (req.session.user_id) {
		next();
	} else {
		res.redirect("/admin");
	}
} );

publish('alreadyLoggedIn', function() {
	if (req.session.user_id) {
		res.redirect(path_to.admin_users);
	} else {
		next();
	}
} );

publish('show_block_content', function() {
	BlockContent.all( function( err, block_contents ) {
		this.block_contents = block_contents;
		next();
	}.bind( this ) );
} );