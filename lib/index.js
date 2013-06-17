'use strict';

var diff = require('./diff');
var convert = require('./convert');
var palette = require('./palette');

exports.diff 			= diff.ciede2000;
exports.rgb_to_lab 		= convert.rgb_to_lab;
exports.closest     	= palette.map_palette;