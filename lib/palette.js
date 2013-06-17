/**
 * @name color_palette.js
 * @author Markus Näsman
 * @copyright 2012 (c) Markus Näsman <markus at botten dot org >
 * @license see COPYING
 */

/**
* EXPORTS
*/
exports.map_palette     = map_palette;
exports.palette_map_key = palette_map_key;

/**
* IMPORTS
*/
var color_diff    = require('./diff');
var color_convert = require('./convert');

/**
 * API FUNCTIONS
 */

/**
* Returns the hash key used for a {rgbcolor} in a {palettemap}
* @param {rgbcolor} c should have fields R,G,B
* @return {string}
*/
function palette_map_key(c)
{
  return "R" + c.R + "B" + c.B + "G" + c.G;
}

/**
* Returns a mapping from each color in a to the closest color in b
* @param [{rgbcolor}] a each element should have fields R,G,B
* @param [{rgbcolor}] b each element should have fields R,G,B
* @return {palettemap}
*/
function map_palette(a, b)
{
  var c = {};
  for (idx1 in a){
    color1 = a[idx1];
    var best_color      = undefined;
    var best_color_diff = undefined;
    for (idx2 in b)
    {
      color2 = b[idx2]
      var current_color_diff = diff(color1,color2);
      if((best_color == undefined) || (current_color_diff < best_color_diff))
      {
        best_color      = color2;
        best_color_diff = current_color_diff;
      }
    }
    c[palette_map_key(color1)] = best_color;
  }
  return c;
}

/**
 * INTERNAL FUNCTIONS
 */

function diff(c1,c2)
{
  c1 = color_convert.rgb_to_lab(c1);
  c2 = color_convert.rgb_to_lab(c2);
  return color_diff.ciede2000(c1,c2);
}

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
