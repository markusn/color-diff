/**
 * @author Markus Näsman
 * @copyright 2012 (c) Markus Näsman <markus at botten dot org >
 * @license Copyright (c) 2012, Markus Näsman
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the name of the <organization> nor the
 *      names of its contributors may be used to endorse or promote products
 *      derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MARKUS NÄSMAN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
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
 * CIEDE2000 tests the diff.cie2000.
 * Cases taken from the paper "The CIEDE2000 Color-Difference Formula:
 * Implementation Notes, Supplementary Test Data, and Mathematical Observations"
 * by Gaurav Sharma, Wencheng Wu and Edul N. Dalal.
 */
function ciede2000_test()
{
  console.log("Starting diff.ciede2000 test");
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
