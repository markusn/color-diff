/**
 * IMPORTS
 */
var assert        = require('assert');
var colorDiff     = require('../lib/index');
var color_convert = require('../lib/convert');

/**
 * CONSTANTS
 */

var pad = function (s) { return s.length === 1 ? "0" + s : s; };
var hex = function (n) { return pad(n.toString(16)); }
var rgb_to_hex = function (c) { return "#" + hex(c.R) + hex(c.G) + hex(c.B); };

var white   = {'R':255 , 'G':255 ,'B':255};
var black   = {'R':0   , 'G':0   ,'B':0};
var navy    = {'R':0   , 'G':0   ,'B':128};
var blue    = {'R':0   , 'G':0   ,'B':255};
var yellow  = {'R':255 , 'G':255 ,'B':0};
var gold    = {'R':255 , 'G':215 ,'B':0};

var white_hex   = rgb_to_hex({'R':255 , 'G':255 ,'B':255});
var black_hex   = rgb_to_hex({'R':0   , 'G':0   ,'B':0});
var navy_hex    = rgb_to_hex({'R':0   , 'G':0   ,'B':128});
var blue_hex    = rgb_to_hex({'R':0   , 'G':0   ,'B':255});
var yellow_hex  = rgb_to_hex({'R':255 , 'G':255 ,'B':0});
var gold_hex    = rgb_to_hex({'R':255 , 'G':215 ,'B':0});

var colors1 = [white, black, navy, blue, yellow, gold]
var colors2 = [white, black, blue, gold]
var colors3 = [white, black, yellow, blue]

var colors1_hex = [white_hex, black_hex, navy_hex, blue_hex, yellow_hex, gold_hex]
var colors2_hex = [white_hex, black_hex, blue_hex, gold_hex]
var colors3_hex = [white_hex, black_hex, yellow_hex, blue_hex]

var colors1_hex_prepared = colorDiff.prepare_palette(colors1_hex);
var colors2_hex_prepared = colorDiff.prepare_palette(colors2_hex);
var colors3_hex_prepared = colorDiff.prepare_palette(colors3_hex);

/**
 * TESTS
 */

describe('index', function(){
  describe('#prepare_palette', function (){
    it('should convert hex through to Lab',
      function() {
        var original = ["#fFfFfF", "#abcdef", "#000000"];
        var prepared = colorDiff.prepare_palette(original);
        assert.deepEqual(prepared, {
          prepared: true,
          original: original,
          lab: [
            color_convert.rgb_to_lab({R: 255, G: 255, B: 255}),
            color_convert.rgb_to_lab({R: 171, G: 205, B: 239}),
            color_convert.rgb_to_lab({R: 0, G: 0, B: 0}),
          ]
        });
      });
  });

  describe('process rgb', function (){
    it('should find correct closest colors',
      function() {
         assert.deepEqual(colorDiff.closest(white, colors1), white);
         assert.deepEqual(colorDiff.closest(black, colors1), black);
         assert.deepEqual(colorDiff.closest(navy, colors1), navy);
         assert.deepEqual(colorDiff.closest(blue, colors1), blue);
         assert.deepEqual(colorDiff.closest(yellow, colors1), yellow);
         assert.deepEqual(colorDiff.closest(gold, colors1), gold);

         assert.deepEqual(colorDiff.closest(white, colors2), white);
         assert.deepEqual(colorDiff.closest(black, colors2), black);
         assert.deepEqual(colorDiff.closest(navy, colors2), blue);
         assert.deepEqual(colorDiff.closest(blue, colors2), blue);
         assert.deepEqual(colorDiff.closest(yellow, colors2), gold);
         assert.deepEqual(colorDiff.closest(gold, colors2), gold);
      });
    it('should find correct furthest colors',
      function() {
         assert.deepEqual(colorDiff.furthest(white, colors3), black);
         assert.deepEqual(colorDiff.furthest(black, colors3), yellow);
         assert.deepEqual(colorDiff.furthest(navy, colors3), yellow);
         assert.deepEqual(colorDiff.furthest(blue, colors3), yellow);
         assert.deepEqual(colorDiff.furthest(yellow, colors3), blue);
         assert.deepEqual(colorDiff.furthest(gold, colors3), blue);
      });
  });

  describe('process hex', function (){
    it('should find correct closest colors',
      function() {
         assert.deepEqual(colorDiff.closest(white_hex, colors1_hex), white_hex);
         assert.deepEqual(colorDiff.closest(black_hex, colors1_hex), black_hex);
         assert.deepEqual(colorDiff.closest(navy_hex, colors1_hex), navy_hex);
         assert.deepEqual(colorDiff.closest(blue_hex, colors1_hex), blue_hex);
         assert.deepEqual(colorDiff.closest(yellow_hex, colors1_hex), yellow_hex);
         assert.deepEqual(colorDiff.closest(gold_hex, colors1_hex), gold_hex);

         assert.deepEqual(colorDiff.closest(white_hex, colors2_hex), white_hex);
         assert.deepEqual(colorDiff.closest(black_hex, colors2_hex), black_hex);
         assert.deepEqual(colorDiff.closest(navy_hex, colors2_hex), blue_hex);
         assert.deepEqual(colorDiff.closest(blue_hex, colors2_hex), blue_hex);
         assert.deepEqual(colorDiff.closest(yellow_hex, colors2_hex), gold_hex);
         assert.deepEqual(colorDiff.closest(gold_hex, colors2_hex), gold_hex);
      });

    it('should find correct furthest colors',
      function() {
         assert.deepEqual(colorDiff.furthest(white_hex, colors3_hex), black_hex);
         assert.deepEqual(colorDiff.furthest(black_hex, colors3_hex), yellow_hex);
         assert.deepEqual(colorDiff.furthest(navy_hex, colors3_hex), yellow_hex);
         assert.deepEqual(colorDiff.furthest(blue_hex, colors3_hex), yellow_hex);
         assert.deepEqual(colorDiff.furthest(yellow_hex, colors3_hex), blue_hex);
         assert.deepEqual(colorDiff.furthest(gold_hex, colors3_hex), blue_hex);
      });
  })

  describe('process hex prepared palette', function (){
    it('should find correct closest colors',
      function() {
         assert.deepEqual(colorDiff.closest(white_hex, colors1_hex_prepared), white_hex);
         assert.deepEqual(colorDiff.closest(black_hex, colors1_hex_prepared), black_hex);
         assert.deepEqual(colorDiff.closest(navy_hex, colors1_hex_prepared), navy_hex);
         assert.deepEqual(colorDiff.closest(blue_hex, colors1_hex_prepared), blue_hex);
         assert.deepEqual(colorDiff.closest(yellow_hex, colors1_hex_prepared), yellow_hex);
         assert.deepEqual(colorDiff.closest(gold_hex, colors1_hex_prepared), gold_hex);

         assert.deepEqual(colorDiff.closest(white_hex, colors2_hex_prepared), white_hex);
         assert.deepEqual(colorDiff.closest(black_hex, colors2_hex_prepared), black_hex);
         assert.deepEqual(colorDiff.closest(navy_hex, colors2_hex_prepared), blue_hex);
         assert.deepEqual(colorDiff.closest(blue_hex, colors2_hex_prepared), blue_hex);
         assert.deepEqual(colorDiff.closest(yellow_hex, colors2_hex_prepared), gold_hex);
         assert.deepEqual(colorDiff.closest(gold_hex, colors2_hex_prepared), gold_hex);
      });

    it('should find correct furthest colors',
      function() {
         assert.deepEqual(colorDiff.furthest(white_hex, colors3_hex_prepared), black_hex);
         assert.deepEqual(colorDiff.furthest(black_hex, colors3_hex_prepared), yellow_hex);
         assert.deepEqual(colorDiff.furthest(navy_hex, colors3_hex_prepared), yellow_hex);
         assert.deepEqual(colorDiff.furthest(blue_hex, colors3_hex_prepared), yellow_hex);
         assert.deepEqual(colorDiff.furthest(yellow_hex, colors3_hex_prepared), blue_hex);
         assert.deepEqual(colorDiff.furthest(gold_hex, colors3_hex_prepared), blue_hex);
      });
  })
});

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
