/**
 * @author Markus Ekholm
 * @copyright 2012-2023 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012-2023, Markus Ekholm
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
export { rgbaToLab, normalize };

/**
 * TYPES
 */

/**
 *
 * @typedef { {X: number, Y: number, Z: number} } XYZColor
 * @typedef {import("../").RGBAColor} RGBAColor
 * @typedef {import("../").RGBAColorUc} RGBAColorUc
 * @typedef {import("../").LabColor} LabColor
 */

/**
 * API FUNCTIONS
 */

/**
* Returns c converted to labcolor. Uses bc as background color,
* defaults to using white as background color. Defaults to
* any color without an alpha channel being specified is treated
* as fully opaque (A=1.0)
* @param {RGBAColor} c
* @param {RGBAColor} [bc]
* @return {LabColor} c converted to LabColor
*/
function rgbaToLab(c, bc) {
  bc = normalize(bc || { R: 255, G: 255, B: 255 });
  c = normalize(c);
  let newC = c;

  if (c.A !== undefined) {
    newC = {
      R: bc.R + (c.R - bc.R) * c.A,
      G: bc.G + (c.G - bc.G) * c.A,
      B: bc.B + (c.B - bc.B) * c.A,
    };
  }

  return xyzToLab(rgbToXyz(newC));
}

/**
 * Returns c converted to XYZColor
 * @param {RGBAColorUc} c
 * @return {XYZColor} c
 */
function rgbToXyz(c) {
  // Based on http://www.easyrgb.com/index.php?X=MATH&H=02
  let R = (c.R / 255);
  let G = (c.G / 255);
  let B = (c.B / 255);

  if (R > 0.04045) R = Math.pow(((R + 0.055) / 1.055), 2.4);
  else R = R / 12.92;
  if (G > 0.04045) G = Math.pow(((G + 0.055) / 1.055), 2.4);
  else G = G / 12.92;
  if (B > 0.04045) B = Math.pow(((B + 0.055) / 1.055), 2.4);
  else B = B / 12.92;

  R *= 100;
  G *= 100;
  B *= 100;

  // Observer. = 2°, Illuminant = D65
  const X = R * 0.4124 + G * 0.3576 + B * 0.1805;
  const Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const Z = R * 0.0193 + G * 0.1192 + B * 0.9505;
  return { X, Y, Z };
}

/**
* Returns c converted to LabColor.
* @param {XYZColor} c
* @return {LabColor} c converted to LabColor
*/
function xyzToLab(c) {
  // Based on http://www.easyrgb.com/index.php?X=MATH&H=07
  const refY = 100.000;
  const refZ = 108.883;
  const refX = 95.047; // Observer= 2°, Illuminant= D65
  let Y = c.Y / refY;
  let Z = c.Z / refZ;
  let X = c.X / refX;
  if (X > 0.008856) X = Math.pow(X, 1 / 3);
  else X = (7.787 * X) + (16 / 116);
  if (Y > 0.008856) Y = Math.pow(Y, 1 / 3);
  else Y = (7.787 * Y) + (16 / 116);
  if (Z > 0.008856) Z = Math.pow(Z, 1 / 3);
  else Z = (7.787 * Z) + (16 / 116);
  const L = (116 * Y) - 16;
  const a = 500 * (X - Y);
  const b = 200 * (Y - Z);
  return { L, a, b };
}

/**
 * @param {RGBAColor} c
 * @returns {RGBAColorUc}
 */
function normalize(c) {
  let r, g, b, a;
  if ("R" in c) {
    r = c.R;
    g = c.G;
    b = c.B;
    a = c.A;
  } else {
    r = c.r;
    g = c.g;
    b = c.b;
    a = c.a;
  }

  /** @type {RGBAColorUc} */
  const normalizedC = { R: r, G: g, B: b };

  if (a !== undefined) normalizedC.A = a;
  return normalizedC;
}
