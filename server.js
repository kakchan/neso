#!/usr/bin/env node

var app = module.exports = require('railway').createServer(),
		express = require('express');

if (!module.parent) {
	var port = process.env.PORT || 3001;

	app.listen(port);
	console.log("Railway server listening on port %d within %s environment", port, app.settings.env);
}

