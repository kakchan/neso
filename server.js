#!/usr/bin/env node

var app = module.exports = require('railway').createServer(),
		express = require('express'),
		RedisStore = require('connect-redis')(express);

var redis_options;
if (process.env['REDISTOGO_URL']) {
	var url = require('url').parse(process.env['REDISTOGO_URL']);
	redis_options = {
		port: url.port,
		host: url.hostname,
		pass: url.auth.split(':')[1]
	};
} else {
	redis_options = {};
}

if (!module.parent) {
	var port = process.env.PORT || 3001;
	app.use(express.cookieParser());
	app.use(express.session( {
		store: new RedisStore( redis_options ),
		secret: "neso"
	} ) );

	app.listen(port);
	console.log("Railway server listening on port %d within %s environment", port, app.settings.env);
}

