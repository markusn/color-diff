/**
 * @author Markus Ekholm
 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012-2016, Markus Ekholm
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the name of the author nor the
 *      names of its contributors may be used to endorse or promote products
 *      derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
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
 * CONSTANTS
 */

var white   = {'R':255 , 'G':255 ,'B':255};
var black   = {'R':0   , 'G':0   ,'B':0};
var navy    = {'R':0   , 'G':0   ,'B':128};
var blue    = {'R':0   , 'G':0   ,'B':255};
var yellow  = {'R':255 , 'G':255 ,'B':0};
var gold    = {'R':255 , 'G':215 ,'B':0};
var colors1 = [white, black, navy, blue, yellow, gold]
var colors2 = [white, black, blue, gold]
var colors3 = [white, black, yellow, blue]

var white_a   = {'R':255 , 'G':255 ,'B':255, 'A': 1.0};
var black_a   = {'R':0   , 'G':0   ,'B':0, 'A': 1.0};
var navy_a    = {'R':0   , 'G':0   ,'B':128, 'A': 1.0};
var blue_a    = {'R':0   , 'G':0   ,'B':255, 'A': 1.0};
var yellow_a  = {'R':255 , 'G':255 ,'B':0, 'A': 1.0};
var gold_a    = {'R':255 , 'G':215 ,'B':0, 'A': 1.0};
var colors1_a = [white_a, black_a, navy_a, blue_a, yellow_a, gold_a]

/**
 * TESTS
 */

describe('palette', function(){
  describe('#map_palette()', function (){
    it('should map all colors to themselves when possible #1',
       function(){
         var expected1_1                                    = {};
         expected1_1[color_palette.palette_map_key(white)]  = white;
         expected1_1[color_palette.palette_map_key(black)]  = black;
         expected1_1[color_palette.palette_map_key(navy)]   = navy;
         expected1_1[color_palette.palette_map_key(blue)]   = blue;
         expected1_1[color_palette.palette_map_key(yellow)] = yellow;
         expected1_1[color_palette.palette_map_key(gold)]   = gold;
         assert.deepEqual(expected1_1,
                          color_palette.map_palette(colors1, colors1));
       });
    it('should map all colors to themselves when possible #2',
       function(){
         var expected1_2                                      = {};
         expected1_2[color_palette.palette_map_key(white_a)]  = white_a;
         expected1_2[color_palette.palette_map_key(black_a)]  = black_a;
         expected1_2[color_palette.palette_map_key(navy_a)]   = navy_a;
         expected1_2[color_palette.palette_map_key(blue_a)]   = blue_a;
         expected1_2[color_palette.palette_map_key(yellow_a)] = yellow_a;
         expected1_2[color_palette.palette_map_key(gold_a)]   = gold_a;
         assert.deepEqual(expected1_2,
                          color_palette.map_palette(colors1_a, colors1_a));
       });
    it('should map navy->blue and yellow->gold when navy and yellow are missing',
       function(){
         var expected2                                    = {};
         expected2[color_palette.palette_map_key(white)]  = white;
         expected2[color_palette.palette_map_key(black)]  = black;
         expected2[color_palette.palette_map_key(navy)]   = blue;
         expected2[color_palette.palette_map_key(blue)]   = blue;
         expected2[color_palette.palette_map_key(yellow)] = gold;
         expected2[color_palette.palette_map_key(gold)]   = gold;
         assert.deepEqual(expected2,
                          color_palette.map_palette(colors1, colors2));
       });
    it('should map white->black & black,navy,blue->yellow & yellow,gold->blue',
       function(){
         var expected3                                    = {};
         expected3[color_palette.palette_map_key(white)]  = black;
         expected3[color_palette.palette_map_key(black)]  = yellow;
         expected3[color_palette.palette_map_key(navy)]   = yellow;
         expected3[color_palette.palette_map_key(blue)]   = yellow;
         expected3[color_palette.palette_map_key(yellow)] = blue;
         expected3[color_palette.palette_map_key(gold)]   = blue;
         assert.deepEqual(expected3,
                          color_palette.map_palette(colors1,
                                                    colors3,
                                                    'furthest'));
       });

  })
});

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
