exports.routes = function (map) {
	map.namespace('admin', function(admin) {
		admin.resources('users');
		admin.resources('posts');
		admin.resources('blockcontents');
	});
	map.resources('blockcontents', { only: ['show' ] });
	map.resources('session', { only: [ 'create' ]});
	map.resources('posts', { only: [ 'show' ]});
	map.resources('install', { only: ['index', 'new'] });
	map.get('/admin', 'session#index');
	map.get('/admin/logout', 'session#destroy');
	map.get('/', 'posts#index');

	map.get('/:id', 'posts#showAliasContent');
};