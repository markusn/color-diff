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
* IMPORTS
*/
import { ciede2000 } from "./diff.js";
import { normalize } from "./convert.js";

/**
* EXPORTS
*/
export {
  mapPalette,
  mapPaletteLab,
  matchPaletteLab,
  paletteMapKey,
  labPaletteMapKey,
};

/**
 * TYPES
 */

/**
 * @typedef {import("../").LabColor} LabColor
 * @typedef {import("../").RGBAColor} RGBAColor
 * @typedef {import("../").PaletteMapLab} PaletteMapLab
 */

/**
 * API FUNCTIONS
 */

/**
* Returns the hash key used for a {rgbcolor} in a {palettemap}
* @param {RGBAColor} c
* @return {string}
*/
function paletteMapKey(c) {
  c = normalize(c);
  if (c.A !== 1.0) {
    return `rgba(${c.R}, ${c.G}, ${c.B}, ${c.A})`;
  }
  return `rgb(${c.R}, ${c.G}, ${c.B})`;
}

/**
* Returns the hash key used for a {labcolor} in a {labpalettemap}
* @param {LabColor} c should have fields L,a,b
* @return {string}
*/
function labPaletteMapKey(c) {
  return `lab(${c.L}, ${c.a}, ${c.b})`;
}

/**
* Returns a mapping from each color in a to the closest/farthest color in b
* @param { RGBAColor[] } a
* @param { RGBAColor[] } b
* @param {('closest'|'furthest')} [type] should be the string 'closest' or 'furthest'
* @param {RGBAColor} [bc] Optional background color when using alpha channels
* @return {import("../").PaletteMap}
*/
function mapPalette(a, b, type, bc) {
  /** @type {import("../").PaletteMap} */
  const c = {};

  bc = bc || { R: 255, G: 255, B: 255 };
  type = type || "closest";
  for (let idx1 = 0; idx1 < a.length; idx1 += 1) {
    const color1 = a[idx1];
    let bestColor;
    let bestColorDiff;
    for (let idx2 = 0; idx2 < b.length; idx2 += 1) {
      const color2 = b[idx2];
      const currentColorDiff = ciede2000(color1, color2, bc);

      if (!bestColor) {
        bestColor = color2;
        bestColorDiff = currentColorDiff;
        continue;
      }

      if (bestColorDiff !== undefined && (type === "closest") && (currentColorDiff < bestColorDiff)) {
        bestColor = color2;
        bestColorDiff = currentColorDiff;
        continue;
      }

      if (bestColorDiff !== undefined && (type === "furthest") && (currentColorDiff > bestColorDiff)) {
        bestColor = color2;
        bestColorDiff = currentColorDiff;
        continue;
      }
    }
    if (bestColor) c[paletteMapKey(color1)] = bestColor;
  }
  return c;
}

/**
* Returns the closest (or furthest) color to targetColor in palette, operating in the L,a,b colorspace for performance
* @param {LabColor} targetColor should have fields L,a,b
* @param {LabColor[]} palette
* @param {boolean} [findFurthest] should be falsy to find the closest color
* @return {LabColor}
*/
function matchPaletteLab(targetColor, palette, findFurthest) {
  let color2, currentColorDiff;
  let bestColor = palette[0];
  let bestColorDiff = ciede2000(targetColor, bestColor);
  for (let idx2 = 1, l = palette.length; idx2 < l; idx2 += 1) {
    color2 = palette[idx2];
    currentColorDiff = ciede2000(targetColor, color2);

    if (
      (!findFurthest && (currentColorDiff < bestColorDiff)) ||
      (findFurthest && (currentColorDiff > bestColorDiff))
    ) {
      bestColor = color2;
      bestColorDiff = currentColorDiff;
    }
  }
  return bestColor;
}

/**
* Returns a mapping from each color in a to the closest color in b
* @param {LabColor[]} a
* @param {LabColor[]} b each element should have fields L,a,b
* @param {('closest'|'furthest')} [type] should be the string 'closest' or 'furthest'
* @return {PaletteMapLab}
*/
function mapPaletteLab(a, b, type) {
  /** @type {Object<string,LabColor>} */
  const c = {};
  const findFurthest = type === "furthest";
  for (let idx1 = 0; idx1 < a.length; idx1 += 1) {
    const color1 = a[idx1];
    c[labPaletteMapKey(color1)] = matchPaletteLab(color1, b, findFurthest);
  }
  return c;
}
