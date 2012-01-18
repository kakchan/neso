var exports = module.exports;
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
}