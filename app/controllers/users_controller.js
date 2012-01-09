load('application');
before(use('requireLogin'));
before(loadUser, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
	this.title = 'New user';
	this.user = new User;
	render();
});

action('create', function() {
	User.create(req.body, function (err, user) {
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
	this.title = 'Users index';
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
	this.user.updateAttributes(body, function (err) {
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
