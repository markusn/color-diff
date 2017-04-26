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
exports.rgb_to_lab         = rgb_to_lab;
exports.rgba_to_lab        = rgba_to_lab;
exports.rgb_or_rgba_to_lab = rgb_or_rgba_to_lab;
exports.hex_to_rgb         = hex_to_rgb;

/**
* IMPORTS
*/
var pow  = Math.pow;
var sqrt = Math.sqrt;

/**
 * API FUNCTIONS
 */

/**
* Returns hex string c converted to rgbcolor.
* @param {rgbcolor} c should be exactly 7 characters long: #rrggbb
* @return {rgbcolor} c converted to rgbcolor
*/
function hex_to_rgb(c)
{
  return {
    R: parseInt(c.substr(1, 2), 16),
    G: parseInt(c.substr(3, 2), 16),
    B: parseInt(c.substr(5, 2), 16),
  };
}

/**
* Returns c converted to labcolor. Uses bc as background color,
* deaults to using white as background color.
* @param {rgbacolor} c should have fields R,G,B,A
* @param {rgbcolor} b should have fields R,G,B
* @return {labcolor} c converted to labcolor
*/
function rgba_to_lab(c, bc)
{
  var bc = typeof bc !== 'undefined' ? bc : {R: 255, G: 255, B:255};
  var new_c = {R: bc.R + (c.R - bc.R) * c.A,
               G: bc.G + (c.G - bc.G) * c.A,
               B: bc.B + (c.B - bc.B) * c.A};
  return rgb_to_lab(new_c)
}

/**
* Returns c converted to labcolor.
* @param {rgbcolor} c should have fields R,G,B
* @return {labcolor} c converted to labcolor
*/
function rgb_to_lab(c)
{
  return xyz_to_lab(rgb_to_xyz(c))
}

/**
* Returns c converted to labcolor. Uses bc as background color,
* deaults to using white as background color.
* @param {rgbcolor} bc should have fields R,G,B
* @param {rgbcolor|rgbacolor} c should have fields R,G,B or R,G,B,A
* @return {labcolor} c converted to labcolor
*/
function rgb_or_rgba_to_lab(bc, c)
{
  if ("A" in c) {
    return rgba_to_lab(c, bc);
  } else {
    return rgb_to_lab(c);
  }
}

/**
* Returns c converted to xyzcolor.
* @param {rgbcolor} c should have fields R,G,B
* @return {xyzcolor} c converted to xyzcolor
*/
function rgb_to_xyz(c)
{
  // Based on http://www.easyrgb.com/index.php?X=MATH&H=02
  var R = ( c.R / 255 );
  var G = ( c.G / 255 );
  var B = ( c.B / 255 );

  if ( R > 0.04045 ) R = pow(( ( R + 0.055 ) / 1.055 ),2.4);
  else               R = R / 12.92;
  if ( G > 0.04045 ) G = pow(( ( G + 0.055 ) / 1.055 ),2.4);
  else               G = G / 12.92;
  if ( B > 0.04045 ) B = pow(( ( B + 0.055 ) / 1.055 ), 2.4);
  else               B = B / 12.92;

  R *= 100;
  G *= 100;
  B *= 100;

  // Observer. = 2°, Illuminant = D65
  var X = R * 0.4124 + G * 0.3576 + B * 0.1805;
  var Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  var Z = R * 0.0193 + G * 0.1192 + B * 0.9505;
  return {'X' : X, 'Y' : Y, 'Z' : Z};
}

/**
* Returns c converted to labcolor.
* @param {xyzcolor} c should have fields X,Y,Z
* @return {labcolor} c converted to labcolor
*/
function xyz_to_lab(c)
{
  // Based on http://www.easyrgb.com/index.php?X=MATH&H=07
  var ref_Y = 100.000;
  var ref_Z = 108.883;
  var ref_X = 95.047; // Observer= 2°, Illuminant= D65
  var Y = c.Y / ref_Y;
  var Z = c.Z / ref_Z;
  var X = c.X / ref_X;
  if ( X > 0.008856 ) X = pow(X, 1/3);
  else                X = ( 7.787 * X ) + ( 16 / 116 );
  if ( Y > 0.008856 ) Y = pow(Y, 1/3);
  else                Y = ( 7.787 * Y ) + ( 16 / 116 );
  if ( Z > 0.008856 ) Z = pow(Z, 1/3);
  else                Z = ( 7.787 * Z ) + ( 16 / 116 );
  var L = ( 116 * Y ) - 16;
  var a = 500 * ( X - Y );
  var b = 200 * ( Y - Z );
  return {'L' : L , 'a' : a, 'b' : b};
}

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
