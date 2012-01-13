load('application');
before( use('show_block_content'), { only: [ "show" ] } );

action( 'show', function() {
	this.title = "Block Content";
	BlockContent.find(params.id, function (err, blockcontent) {
		render({ block_content: blockcontent });
	}.bind(this));
} );