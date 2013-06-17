/**
 * @name color_palette_test.js
 * @author Markus Näsman
 * @copyright 2012 (c) Markus Näsman <markus at botten dot org >
 * @license see COPYING
 */

/**
 * IMPORTS
 */
var assert        = require('assert');
var color_palette = require('./color_palette.js');

/**
 * TESTS
 */

function map_palette_test()
{
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
}

/**
 * RUN TESTS
 */

map_palette_test();

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
