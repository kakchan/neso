exports.routes = function (map) {
	map.namespace('admin', function(admin) {
		admin.resources('users');
		admin.resources('posts');
	});
	map.resources('session', { only: [ 'index', 'create' ]});
	map.get('/logout', 'session#destroy');
	map.get('/', 'session#index');

	// Generic routes. Add all your routes below this line
	// feel free to remove generic routes
	map.all(':controller/:action');
	map.all(':controller/:action/:id');
};