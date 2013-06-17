/**
 * @name color_diff_test.js
 * @author Markus Näsman
 * @copyright 2012 (c) Markus Näsman <markus at botten dot org >
 * @license see COPYING
 */

/**
 * IMPORTS
 */
var assert = require('assert');
var color_diff = require('../lib/diff');

/**
 * TESTS
 */

/**
 * CIEDE2000 tests the color_diff.cie2000.
 * Cases taken from the paper "The CIEDE2000 Color-Difference Formula:
 * Implementation Notes, Supplementary Test Data, and Mathematical Observations"
 * by Gaurav Sharma, Wencheng Wu and Edul N. Dalal.
 */
function ciede2000_test()
{
  console.log("Starting color_diff.ciede2000 test");
  assert.equal(2.0425, round(color_diff.ciede2000(
              {'L' : 50.0000,
						   'a' : 2.6772,
						   'b' : -79.7751
						  },
						  {'L' : 50.0000,
						   'a' : 0.0000,
						   'b' : -82.7485
						  })));
  assert.equal(2.8615, round(color_diff.ciede2000(
              {'L' : 50.0000,
						   'a' : 3.1571,
						   'b' : -77.2803
						  },
						  {'L' : 50.0000,
						   'a' : 0.0000,
						   'b' : -82.7485
						  })));
  assert.equal(0.9082, round(color_diff.ciede2000(
              {'L' : 2.0776,
						   'a' : 0.0795,
						   'b' : -1.1350
						  },
						  {'L' : 0.9033,
						   'a' : -0.0636,
						   'b' : -0.5514
						  })));
  console.log("...Finished!");
}

/**
 * INTERNAL FUNCTIONS
 */
function round(n){ return Math.round(n*10000)/10000; }


/**
 * RUN TESTS
 */
// Run CIEDE2000 tests
ciede2000_test();

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
