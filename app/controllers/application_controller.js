before('protect from forgery', function () {
	protectFromForgery('f56f330058d7051471dbee262800bdb87554ed3f');
});

publish('requireLogin', function () {
	if (req.session.user_id) {
		next();
	} else {
		res.redirect('/');
	}
} );

publish('alreadyLoggedIn', function() {
	if (req.session.user_id) {
		res.redirect('/posts');
	} else {
		next();
	}
} );