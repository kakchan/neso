var Utils = require( "../lib/Utils" );
exports[ "test merge()"] = function( test ) {
	test.deepEqual( { a: 1 }, Utils.merge( { a: 2 }, { a: 1 } ) , "this assertion should pass" );
	test.deepEqual( { a: 1, b: 2 }, Utils.merge( { a: 1 }, { b: 2 } ) , "this assertion should pass" );
	test.deepEqual( { a: 1, b: 2, c: 3 }, Utils.merge( { a: 1 }, { b: 2 }, { c: 3 } ) , "this assertion should pass" );
	test.deepEqual( { a: 1, b: 2, c: 3 }, Utils.merge( { a: 1 }, { b: 2, c: 3 } ) , "this assertion should pass" );
	test.deepEqual( { a: 1, b: 2, c: 3, d: 4 }, Utils.merge( { a: 1 }, { b: 2, c: 3 }, { d: 4 } ) , "this assertion should pass" );
	test.done();
};