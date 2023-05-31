// Types

/**
 * @typedef {Object} RGBAColorUc
 * @property {number} R
 * @property {number} G
 * @property {number} B
 * @property {number} [A]
 * @typedef {Object} RGBAColorLc
 * @property {number} r
 * @property {number} g
 * @property {number} b
 * @property {number} [a]
 * @typedef {(RGBAColorUc | RGBAColorLc)} RGBAColor
 * @typedef { {L: number, a: number, b: number} } LabColor
 * @typedef {(RGBAColor | LabColor)} Color
 * @typedef {Object<string,RGBAColor>} PaletteMap
 * @typedef {Object<string,LabColor>} PaletteMapLab
 */

// Imports
import { rgbaToLab } from "./lib/convert.js";
import { ciede2000 } from "./lib/diff.js";
import {
  mapPalette,
  paletteMapKey,
  matchPaletteLab,
  mapPaletteLab,
  labPaletteMapKey,
} from "./lib/palette.js";

// Exports
export {
  closest,
  closestLab,
  furthest,
  furthestLab,
  mapPalette,
  paletteMapKey,
  matchPaletteLab,
  mapPaletteLab,
  labPaletteMapKey,
  ciede2000 as diff,
  rgbaToLab,
  // eslint-disable-next-line camelcase
  rgb_to_lab,
  // eslint-disable-next-line camelcase
  rgba_to_lab,
  // eslint-disable-next-line camelcase
  map_palette,
  // eslint-disable-next-line camelcase
  palette_map_key,
  // eslint-disable-next-line camelcase
  match_palette_lab,
  // eslint-disable-next-line camelcase
  map_palette_lab,
  // eslint-disable-next-line camelcase
  lab_palette_map_key,
  // eslint-disable-next-line camelcase
  closest_lab,
  // eslint-disable-next-line camelcase
  furthest_lab,
};

/**
 * Returns the color in the palette closest to target, given the background color bc
 * @param {RGBAColor} target
 * @param {RGBAColor[]} relative
 * @param {RGBAColor} bc
 * @returns {RGBAColor}
 */
function closest(target, relative, bc) {
  const key = paletteMapKey(target);
  bc = bc || { R: 255, G: 255, B: 255 };
  const result = mapPalette([ target ], relative, "closest", bc);

  return result[key];
}

/**
 * Returns the lab color in the palette closest to target
 * @param {LabColor} target
 * @param {LabColor[]} relative
 * @returns {LabColor}
 */
function closestLab(target, relative) {
  return matchPaletteLab(target, relative, false);
}

/**
 * Returns the color in the palette furthest from target, given the background color bc
 * @param {RGBAColor} target
 * @param {RGBAColor[]} relative
 * @param {RGBAColor} bc
 * @returns {RGBAColor}
 */
function furthest(target, relative, bc) {
  const key = paletteMapKey(target);
  bc = bc || { R: 255, G: 255, B: 255 };
  const result = mapPalette([ target ], relative, "furthest", bc);

  return result[key];
}

/**
 * Returns the color in the palette furthest from target, given the background color bc
 * @param {LabColor} target
 * @param {LabColor[]} relative
 * @returns {LabColor}
 */
function furthestLab(target, relative) {
  return matchPaletteLab(target, relative, true);
}

/** Deprecated function names in snake_case to remain backwards compatible */

/**
* @deprecated since version 1.3
* @param {RGBAColor[]} a
* @param {RGBAColor[]} b
* @param {('closest'|'furthest')} [type]
* @param {RGBAColor} [bc]
* @return {PaletteMap}
*/
// eslint-disable-next-line camelcase
function map_palette(a, b, type, bc) {
  return mapPalette(a, b, type, bc);
}

/**
* @deprecated since version 1.3
* @param {RGBAColor} c
* @return {String}
*/
// eslint-disable-next-line camelcase
function palette_map_key(c) {
  return paletteMapKey(c);
}

/**
* @deprecated since version 1.3
* @param {RGBAColor} c
* @return {LabColor} c
*/
// eslint-disable-next-line camelcase
function rgb_to_lab(c) {
  return rgbaToLab(c);
}

/**
* @deprecated since version 1.3
* @param {RGBAColor} c
* @return {LabColor} c
*/
// eslint-disable-next-line camelcase
function rgba_to_lab(c) {
  return rgbaToLab(c);
}

/**
* @deprecated since version 1.3
* @param {LabColor} targetColor
* @param {LabColor[]} palette
* @param {boolean} [findFurthest]
* @return {LabColor}
*/
// eslint-disable-next-line camelcase
function match_palette_lab(targetColor, palette, findFurthest) {
  return matchPaletteLab(targetColor, palette, findFurthest);
}

/**
* @deprecated since version 1.3
* @param {LabColor[]} a
* @param {LabColor[]} b
* @param {('closest'|'furthest')} [type]
* @return {PaletteMapLab}
*/
// eslint-disable-next-line camelcase
function map_palette_lab(a, b, type) {
  return mapPaletteLab(a, b, type);
}

/**
* @deprecated since version 1.3
* @param {LabColor} c
* @return {string}
*/
// eslint-disable-next-line camelcase
function lab_palette_map_key(c) {
  return labPaletteMapKey(c);
}

/**
* @deprecated since version 1.3
 * @param {LabColor} target
 * @param {LabColor[]} relative
 * @returns {LabColor}
*/
// eslint-disable-next-line camelcase
function closest_lab(target, relative) {
  return closestLab(target, relative);
}

/**
* @deprecated since version 1.3
 * @param {LabColor} target
 * @param {LabColor[]} relative
 * @returns {LabColor}
*/
// eslint-disable-next-line camelcase
function furthest_lab(target, relative) {
  return furthestLab(target, relative);
}
