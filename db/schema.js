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

User.validatesLengthOf('username', {min: 6});
User.validatesPresenceOf('username', 'password', 'full_name');

var BlockContent = describe('BlockContent', function () {
	property('permalink', String);
  property('title', String);
  property('content', String);
});

var Install = describe('Install', function () {
	property('isInstalled', Boolean);
});