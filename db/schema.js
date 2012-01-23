var Post = describe('Post', function () {
	property('permalink', String);
	property('title', String);
	property('content', String);
	property('excerpt', String);
	property('thumbnail_filename', String);

	property('published_date', { type: Date, "default": Date.now });
	property('published', Boolean);
});

var User = describe('User', function () {
	property('username', String);
	property('password', String);
	property('full_name', String);
	property('email', String);
});

User.validatesLengthOf('username', {min: 4});
User.validatesPresenceOf('username', 'password', 'full_name');

User.hasMany( Post, { as: 'posts', foreignKey: 'userId' } );
Post.belongsTo( User, { as: 'author', foreignKey: 'userId' } );

var BlockContent = describe('BlockContent', function () {
	property('permalink', String);
  property('title', String);
  property('content', String);
});

var Install = describe('Install', function () {
	property('isInstalled', Boolean);
});