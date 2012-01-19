load('application');

var crypto = require('ezcrypto').Crypto;

function run_install_scripts() {
	var models = {
		User: User,
		Post: Post,
		BlockContent: BlockContent
	};
	var scripts = {
		User: [
			{
				username: "admin",
				password: crypto.SHA256("admin"),
				full_name: "Administrator",
				email: ""
			}
		],
		Post: [
			{
				permalink: "test-post-1",
				title: "Test Post 1" ,
				content: "Test Post 1 Content",
				excerpt: "Test Post 1 Content Overview",
				author: "admin",
				published_date: new Date(),
				published: true
			},
			{
				permalink: "test-post-2",
				title: "Test Post 2",
				content: "Test Post 2 Content",
				excerpt: "Test Post 2 Content Overview",
				author: "admin",
				published_date: new Date(),
				published: true
			}
		],
		BlockContent: [
			{
				permalink: "test-block-content-1",
				title: "Test Block Content 1" ,
				content: "Test Block Content 1's Content"
			},
			{
				permalink: "test-block-content-\2",
				title: "Test Block Content 2",
				content: "Test Block Content 2's Content"
			}
		]
	};
	for ( var script_name in scripts ) {
		var model = models[script_name];
		scripts[script_name].forEach( function( script_obj ) {
			model.create( script_obj, function() {} );
		});
		Install.create( {
			"isInstalled": true
		}, function(err, install) {
			render({
				message: !err ?
					"Congratulations! You have successfully install Neso" :
					"Sorry! Installation Unsuccessful."
			});
		} );
	}
}

action('index', function() {
	this.title = "Installation";
	Install.all( function( err, installed_scripts) {
		if ( installed_scripts.length === 0 ) {
			render( {
				message: null
			} );
		} else {
			render( {
				message: "You have successfully installed Neso"
			} );
		}
	})
});

action('new', function() {
	this.title = "Installation";
	Install.all( function( err, installed_scripts ) {
		if ( installed_scripts.length === 0 ) {
			run_install_scripts();
		}
	});
});