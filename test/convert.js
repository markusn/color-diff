/**
 * @name color_convert_test.js
 * @author Markus Näsman
 * @copyright 2012 (c) Markus Näsman <markus at botten dot org >
 * @license see COPYING
 */

/**
 * IMPORTS
 */
var assert = require('assert');
var color_convert = require('../lib/convert');

/**
 * TESTS
 */

function rgb_to_lab_test()
{
  console.log("Starting color_convert.rgb_to_lab test");
  assert.deepEqual({'L' : 40.473, 'a' : -6.106, 'b' : -21.417},
                   round_all(color_convert.rgb_to_lab({'R' : 55,
                                                       'G' : 100,
                                                       'B' : 130})));
  assert.deepEqual({'L' : 0, 'a' : 0, 'b' : 0},
                   round_all(color_convert.rgb_to_lab({'R' : 0,
                                                       'G' : 0,
                                                       'B' : 0})));
  assert.deepEqual({'L' : 100, 'a' : 0.005, 'b' : -0.010},
                   round_all(color_convert.rgb_to_lab({'R' : 255,
                                                       'G' : 255,
                                                       'B' : 255})));
  console.log("...Finished!");
}

/**
 * INTERNAL FUNCTIONS
 */
function round_all(c){ return {'L' : round(c.L),
                               'a' : round(c.a),
                               'b' : round(c.b)};
                     }
function round(n){ return Math.round(n*1000)/1000; }

/**
 * RUN TESTS
 */
// Run rgb_to_lab tests
rgb_to_lab_test();

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
