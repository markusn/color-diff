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
var assert        = require('assert');
var color_palette = require('../lib/palette');

/**
 * TESTS
 */

function map_palette_test()
{
  console.log("Starting palette.map_palette test");
  white                                             = {'R':255 , 'G':255 ,'B':255};
  black                                             = {'R':0   , 'G':0   ,'B':0};
  navy                                              = {'R':0   , 'G':0   ,'B':128};
  blue                                              = {'R':0   , 'G':0   ,'B':255};
  yellow                                            = {'R':255 , 'G':255 ,'B':0};
  gold                                              = {'R':255 , 'G':215 ,'B':0};
  colors1                                           = [white, black, navy, blue, yellow, gold]
  colors2                                           = [white, black, blue, gold]
  expected1                                         = {};
  expected2                                         = {};
  expected1[color_palette.palette_map_key(white)]   = white;
  expected1[color_palette.palette_map_key(black)]   = black;
  expected1[color_palette.palette_map_key(navy)]    = navy;
  expected1[color_palette.palette_map_key(blue)]    = blue;
  expected1[color_palette.palette_map_key(yellow)]  = yellow;
  expected1[color_palette.palette_map_key(gold)]    = gold;
  expected2[color_palette.palette_map_key(white)]   = white;
  expected2[color_palette.palette_map_key(black)]   = black;
  expected2[color_palette.palette_map_key(navy)]    = blue;
  expected2[color_palette.palette_map_key(blue)]    = blue;
  expected2[color_palette.palette_map_key(yellow)]  = gold;
  expected2[color_palette.palette_map_key(gold)]    = gold;
  assert.deepEqual(expected1, color_palette.map_palette(colors1, colors1));
  assert.deepEqual(expected2, color_palette.map_palette(colors1, colors2));
  console.log("...Finished!");
}

/**
 * RUN TESTS
 */

map_palette_test();

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
