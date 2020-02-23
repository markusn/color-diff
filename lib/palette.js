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
* EXPORTS
*/
exports.map_palette         = map_palette;
exports.map_palette_lab     = map_palette_lab;
exports.match_palette_lab   = match_palette_lab;
exports.palette_map_key     = palette_map_key;
exports.lab_palette_map_key = lab_palette_map_key;

/**
* IMPORTS
*/
var ciede2000     = require('./diff').ciede2000;
var color_convert = require('./convert');

/**
 * API FUNCTIONS
 */

/**
* Returns the hash key used for a {rgbcolor} in a {palettemap}
* @param {rgbcolor} c should have fields R,G,B (case insensitive)
* @return {string}
*/
function palette_map_key(c)
{
  c = color_convert.normalize_rgb(c);
  var s = "R" + c.R + "B" + c.B + "G" + c.G;
  if ("A" in c) {
    s = s + "A" + c.A;
  }
  return s;
}

/**
* Returns the hash key used for a {labcolor} in a {labpalettemap}
* @param {labcolor} c should have fields L,a,b
* @return {string}
*/
function lab_palette_map_key(c)
{
  return "L" + c.L + "a" + c.a + "b" + c.b;
}

/**
* Returns a mapping from each color in a to the closest/farthest color in b
* @param [{rgbcolor}] a each element should have fields R,G,B (case insensitive)
* @param [{rgbcolor}] b each element should have fields R,G,B (case insensitive)
* @param {('closest'|'furthest')} type should be the string 'closest' or 'furthest'
* @param {rgbcolor} bc Optional background color when using alpha channels
* @return {palettemap}
*/
function map_palette(a, b, type, bc)
{
  var c = {};
  bc = typeof bc !== 'undefined' ? bc : {R: 255, G: 255, B:255};
  type = type || 'closest';
  for (var idx1 = 0; idx1 < a.length; idx1 += 1){
    var color1 = a[idx1];
    var best_color      = undefined;
    var best_color_diff = undefined;
    for (var idx2 = 0; idx2 < b.length; idx2 += 1)
    {
      var color2 = b[idx2];
      var current_color_diff = diff(color1, color2, bc);

      if((best_color == undefined) ||
         ((type === 'closest') && (current_color_diff < best_color_diff)))
      {
        best_color      = color2;
        best_color_diff = current_color_diff;
        continue;
      }
      if((type === 'furthest') && (current_color_diff > best_color_diff))
      {
        best_color      = color2;
        best_color_diff = current_color_diff;
        continue;
      }
    }
    c[palette_map_key(color1)] = best_color;
  }
  return c;
}

/**
* Returns the closest (or furthest) color to target_color in palette, operating in the L,a,b colorspace for performance
* @param {labcolor} target_color should have fields L,a,b
* @param [{labcolor}] palette each element should have fields L,a,b
* @param 'find_furthest' should be falsy to find the closest color
* @return {labcolor}
*/
function match_palette_lab(target_color, palette, find_furthest)
{
  var color2, current_color_diff;
  var best_color      = palette[0];
  var best_color_diff = ciede2000(target_color, best_color);
  for (var idx2 = 1, l = palette.length; idx2 < l; idx2 += 1)
  {
    color2 = palette[idx2];
    current_color_diff = ciede2000(target_color, color2);

    if(
      (!find_furthest && (current_color_diff < best_color_diff)) ||
      (find_furthest && (current_color_diff > best_color_diff))
    )
    {
      best_color      = color2;
      best_color_diff = current_color_diff;
    }
  }
  return best_color;
}

/**
* Returns a mapping from each color in a to the closest color in b
* @param [{labcolor}] a each element should have fields L,a,b
* @param [{labcolor}] b each element should have fields L,a,b
* @param {('closest'|'furthest')} type should be the string 'closest' or 'furthest'
* @return {labpalettemap}
*/
function map_palette_lab(a, b, type)
{
  var c = {};
  var find_furthest = type === 'furthest';
  for (var idx1 = 0; idx1 < a.length; idx1 += 1)
  {
    var color1 = a[idx1];
    c[lab_palette_map_key(color1)] = match_palette_lab(color1, b, find_furthest);
  }
  return c;
}

/**
 * INTERNAL FUNCTIONS
 */

function diff(c1, c2, bc)
{
  var conv_c1 = color_convert.rgb_to_lab;
  var conv_c2 = color_convert.rgb_to_lab;
  var rgba_conv = function(x){ return color_convert.rgba_to_lab(x, bc); };
  if ("A" in c1) {
    conv_c1 = rgba_conv;
  }
  if ("A" in c2) {
    conv_c2 = rgba_conv;
  }
  c1 = conv_c1(c1);
  c2 = conv_c2(c2);
  return ciede2000(c1, c2);
}

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
