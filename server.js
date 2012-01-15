#!/usr/bin/env node

var app = module.exports = require('railway').createServer(),
		express = require('express'),
		MemoryStore = require('connect/lib/middleware/session/memory');

if (!module.parent) {
    var port = process.env.PORT || 3001;
		app.use(express.cookieParser());
		app.use(express.session( {
			store: new MemoryStore( {
				reapInterval: 600000
			} ),
			secret: "mimas"
		} ) );

    app.listen(port);
    console.log("Railway server listening on port %d within %s environment", port, app.settings.env);
}

