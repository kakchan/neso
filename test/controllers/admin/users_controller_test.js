require('../../test_helper.js').controller('users', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
	return {
		username: '',
		password: '',
		full_name: '',
		email: ''
	};
}

exports['users controller'] = {
	'GET new': function (test) {
		test.get('/admin/users/new', function () {
			test.success();
			test.render('new');
			test.render('form.' + app.set('view engine'));
			test.done();
		});
	},

	'GET index': function (test) {
		test.get('/admin/users', function () {
			test.success();
			test.render('index');
			test.done();
		});
	},

	'GET edit': function (test) {
		var find = User.find;
		User.find = sinon.spy(function (id, callback) {
			callback(null, new User);
		});
		test.get('/admin/users/42/edit', function () {
			test.ok(User.find.calledWith('42'));
			User.find = find;
			test.success();
			test.render('edit');
			test.done();
		});
	},

	'GET show': function (test) {
		var find = User.find;
		User.find = sinon.spy(function (id, callback) {
			callback(null, new User);
		});
		test.get('/admin/users/42', function (req, res) {
			test.ok(User.find.calledWith('42'));
			User.find = find;
			test.success();
			test.render('show');
			test.done();
		});
	},

	'POST create': function (test) {
		var user = new ValidAttributes;
		var create = User.create;
		User.create = sinon.spy(function (data, callback) {
			test.strictEqual(data, user);
			callback(null, user);
		});
		test.post('/admin/users', user, function () {
			test.redirect('/admin/users');
			test.flash('info');
			test.done();
		});
	},

	'POST create fail': function (test) {
		var user = new ValidAttributes;
		var create = User.create;
		User.create = sinon.spy(function (data, callback) {
			test.strictEqual(data, user);
			callback(new Error, null);
		});
		test.post('/admin/users', user, function () {
			test.success();
			test.render('new');
			test.flash('error');
			test.done();
		});
	},

	'PUT update': function (test) {
		User.find = sinon.spy(function (id, callback) {
			test.equal(id, 1);
			callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
		});
		test.put('/admin/users/1', new ValidAttributes, function () {
			test.redirect('/admin/users/1');
			test.flash('info');
			test.done();
		});
	},

	'PUT update fail': function (test) {
		User.find = sinon.spy(function (id, callback) {
			test.equal(id, 1);
			callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
		});
		test.put('/admin/users/1', new ValidAttributes, function () {
			test.success();
			test.render('edit');
			test.flash('error');
			test.done();
		});
	},

	'DELETE destroy': function (test) {
		test.done();
	},

	'DELETE destroy fail': function (test) {
		test.done();
	}
};

