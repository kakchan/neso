exports.routes = function (map) {
	map.namespace('admin', function(admin) {
		admin.resources('users');
		admin.resources('posts');
	});
	map.resources('session', { only: [ 'create' ]});
	map.get('/admin', 'session#index');
	map.get('/admin/logout', 'session#destroy');
	map.get('/', 'posts#index');

	// Generic routes. Add all your routes below this line
	// feel free to remove generic routes
	map.all(':controller/:action');
	map.all(':controller/:action/:id');
};