load('application');
before(use('requireLogin'));
before(loadUser, {only: ['show', 'edit', 'update', 'destroy']});
layout('admin');

var crypto = require('ezcrypto').Crypto;

var getUserInfo = function() {
	return {
		username: req.body.username,
		password: crypto.SHA256(req.body.password),
		full_name: req.body.full_name,
		email: req.body.email
	};
};

action('new', function () {
	this.title = 'New user';
	this.user = new User;
	render();
});

action('create', function() {
	User.create(getUserInfo(), function (err, user) {
		if (err) {
			flash('error', 'User can not be created');
			render('new', {
				user: user,
				title: 'New user'
			});
		} else {
			flash('info', 'User created');
			redirect(path_to.users);
		}
	});
});

action('index', function() {
	this.title = 'Users';
	User.all(function (err, users) {
		render({
			users: users
		});
	});
});

action('show', function() {
	this.title = 'User show';
	render();
});

action('edit', function() {
	this.title = 'User edit';
	render();
});

action('update', function() {
	this.user.updateAttributes(getUserInfo(), function (err) {
		if (!err) {
			flash('info', 'User updated');
			redirect(path_to.users);
		} else {
			flash('error', 'User can not be updated');
			this.title = 'Edit user details';
			render('edit');
		}
	}.bind(this));
});

action('destroy', function() {
	this.user.destroy(function (error) {
		if (error) {
			flash('error', 'Can not destroy user');
		} else {
			flash('info', 'User successfully removed');
		}
		send("'" + path_to.users + "'");
	});
});

function loadUser() {
	User.find(params.id, function (err, user) {
		if (err) {
			redirect(path_to.users);
		} else {
			this.user = user;
			next();
		}
	}.bind(this));
}