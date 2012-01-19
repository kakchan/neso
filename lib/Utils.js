var exports = module.exports,
		DateFormat = require( "dateformatjs" ).DateFormat,
		dateFormat = new DateFormat( "dd/MM/yyyy" );

exports.merge = function() {
	var args = arguments,
			mrg = function( a, b ) {
				for ( var name in b ) {
					a[ name ] = b[ name ];
				}
				return a;
			};
	var retObj = {};
	for ( var i=0, len = args.length; i < len; i++ ) {
		retObj = mrg( retObj, args[ i ] );
	}
	return retObj;
};

exports.formatToDate = function( seconds ) {
	if ( !isNaN(seconds) ) {
		seconds = parseInt( seconds, 10 );
	}
	return dateFormat.format( new Date( seconds ) );
};

exports.parseDate = function( str ) {
	return dateFormat.parse( str );
};

exports.convertToHtml = function( str ) {
	return str.replace( /\n/g, "<br/>" );
};