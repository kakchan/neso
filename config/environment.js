var express    = require('express'),
		form = require('connect-form'),
		RedisStore = require('connect-redis')(express);
;

var redis_options = {};
if (process.env['REDISTOGO_URL']) {
	var url = require('url').parse(process.env['REDISTOGO_URL']);
	redis_options = {
		port: url.port,
		host: url.hostname,
		pass: url.auth.split(':')[1]
	};
}

app.configure(function(){
    var cwd = process.cwd();
		app.use(express.cookieParser());
		app.use(express.session( {
			store: new RedisStore( redis_options ),
			secret: "neso"
		} ) );
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('views', cwd + '/app/views');
    app.set('view engine', 'ejs');
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
		app.use(form({
			keyExtensions: true,
			maxFieldsSize: 1024 * 1024 // 1MB
		} ));
		app.use(express.cookieParser());
    app.use(express.bodyParser({
	    uploadDir: "tmp"
    }));
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret'}));
    app.use(express.methodOverride());
    app.use(app.router);
});
