'use strict';

var diff = require('./diff');
var convert = require('./convert');
var palette = require('./palette');

var color = module.exports = {};

color.diff                = diff.ciede2000;
color.rgb_to_lab          = convert.rgb_to_lab;
color.rgba_to_lab         = convert.rgba_to_lab;
color.map_palette         = palette.map_palette;
color.palette_map_key     = palette.palette_map_key;
color.map_palette_lab     = palette.map_palette_lab;
color.lab_palette_map_key = palette.lab_palette_map_key;
color.match_palette_lab   = palette.match_palette_lab;

color.process = function(target, relative, find_furthest, bc) {
  if (relative.prepared) {
    var target_lab = convert.rgb_or_rgba_to_lab(bc, marshall(target));
    var result_lab = color.match_palette_lab(target_lab, relative.lab, find_furthest);
    return relative.original[relative.lab.indexOf(result_lab)];
  }
  var target_rgb = marshall(target);
  var relative_rgb = relative.map(marshall);
  var key = color.palette_map_key(target_rgb);
  bc = typeof bc !== 'undefined' ? bc : {R: 255, G: 255, B:255};
  var result = color.map_palette([target_rgb], relative_rgb, (find_furthest ? 'furthest' : 'closest'), bc);
  if (typeof target === 'string') {
    return relative[relative_rgb.indexOf(result[key])];
  } else {
    return result[key];
  }
};

color.closest = function(target, relative, bc) {
  return color.process(target, relative, false, bc);
}

color.furthest = function(target, relative, bc) {
  return color.process(target, relative, true, bc);
};

color.closest_lab = function(target, relative) {
  return color.match_palette_lab(target, relative, false);
};

color.furthest_lab = function(target, relative) {
  return color.match_palette_lab(target, relative, true);
};

color.prepare_palette = function(relative, bc) {
  return {
    prepared: true,
    original: relative,
    lab: relative.map(marshall).map(convert.rgb_or_rgba_to_lab.bind(null, bc)),
  };
}

function marshall(c) {
  if (typeof c === 'string') {
    return convert.hex_to_rgb(c);
  } else {
    return c;
  }
}
