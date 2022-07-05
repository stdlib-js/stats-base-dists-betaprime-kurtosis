/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var abs = require( '@stdlib/math-base-special-abs' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var NINF = require( '@stdlib/constants-float64-ninf' );
var EPS = require( '@stdlib/constants-float64-eps' );
var kurtosis = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/python/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof kurtosis, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var v = kurtosis( NaN, 0.5 );
	t.equal( isnan( v ), true, 'returns NaN' );

	v = kurtosis( 10.0, NaN );
	t.equal( isnan( v ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = kurtosis( -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `beta <= 4`, the function returns `NaN`', function test( t ) {
	var y;

	y = kurtosis( 2.0, 4.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( 2.0, 3.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( 2.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( 2.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = kurtosis( NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns the excess kurtosis of a beta prime distribution', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var y;

	expected = data.expected;
	alpha = data.alpha;
	beta = data.beta;
	for ( i = 0; i < expected.length; i++ ) {
		y = kurtosis( alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 320.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});