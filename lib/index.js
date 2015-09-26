'use strict';

var diff = require('./diff');
var convert = require('./convert');
var palette = require('./palette');

var color = module.exports = {};

color.diff            = diff.ciede2000;
color.rgb_to_lab      = convert.rgb_to_lab;
color.rgba_to_lab     = convert.rgba_to_lab;
color.map_palette     = palette.map_palette;
color.palette_map_key = palette.palette_map_key;

color.closest = function(target, relative, bc) {
    var key = color.palette_map_key(target);
    bc = typeof bc !== 'undefined' ? bc : {R: 255, G: 255, B:255};
    var result = color.map_palette([target], relative, 'closest', bc);

    return result[key];
};

color.furthest = function(target, relative, bc) {
    var key = color.palette_map_key(target);
    bc = typeof bc !== 'undefined' ? bc : {R: 255, G: 255, B:255};
    var result = color.map_palette([target], relative, 'furthest', bc);

    return result[key];
};
