define('User', function () {
	property('email', String, { index: true });
	property('password', String);
	property('activated', Boolean, {"default": false});
});

var Post = describe('Post', function () {
	property('permalink', String);
	property('title', String);
	property('content', String);
	property('excerpt', String);
	property('author', String);

	property('published_date', Date);
	property('published', Boolean);
});

var User = describe('User', function () {
	property('username', String);
	property('password', String);
	property('full_name', String);
	property('email', String);
});

var BlockContent = describe('BlockContent', function () {
    property('title', String);
    property('content', String);
});