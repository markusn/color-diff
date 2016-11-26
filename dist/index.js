'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.furthest = exports.closest = exports.rgba_to_lab = exports.rgb_to_lab = exports.ciede2000 = undefined;

var _diff = require('./diff');

var _convert = require('./convert');

var _palette = require('./palette');

function closest(target, relative) {
  var bc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { R: 255, G: 255, B: 255 };

  var key = (0, _palette.palette_map_key)(target);
  var result = (0, _palette.map_palette)([target], relative, 'closest', bc);
  return result[key];
}

function furthest(target, relative) {
  var bc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { R: 255, G: 255, B: 255 };

  var key = (0, _palette.palette_map_key)(target);
  var result = (0, _palette.map_palette)([target], relative, 'furthest', bc);
  return result[key];
}

exports.ciede2000 = _diff.ciede2000;
exports.rgb_to_lab = _convert.rgb_to_lab;
exports.rgba_to_lab = _convert.rgba_to_lab;
exports.closest = closest;
exports.furthest = furthest;