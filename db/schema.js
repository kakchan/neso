define('User', function () {
	property('email', String, { index: true });
	property('password', String);
	property('activated', Boolean, {"default": false});
});

var Post = describe('Post', function () {
	property('title', String);
	property('content', String);
	property('published_date', Date);
	property('published', Boolean);
});