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

var whiteHex   = rgb_to_hex({'R':255 , 'G':255 ,'B':255});
var blackHex   = rgb_to_hex({'R':0   , 'G':0   ,'B':0});
var navyHex    = rgb_to_hex({'R':0   , 'G':0   ,'B':128});
var blueHex    = rgb_to_hex({'R':0   , 'G':0   ,'B':255});
var yellowHex  = rgb_to_hex({'R':255 , 'G':255 ,'B':0});
var goldHex    = rgb_to_hex({'R':255 , 'G':215 ,'B':0});

var colors1 = [white, black, navy, blue, yellow, gold]
var colors2 = [white, black, blue, gold]
var colors3 = [white, black, yellow, blue]

var colors1Hex = [whiteHex, blackHex, navyHex, blueHex, yellowHex, goldHex]
var colors2Hex = [whiteHex, blackHex, blueHex, goldHex]
var colors3Hex = [whiteHex, blackHex, yellowHex, blueHex]

var colors1HexPrepared = colorDiff.preparePalette(colors1Hex);
var colors2HexPrepared = colorDiff.preparePalette(colors2Hex);
var colors3HexPrepared = colorDiff.preparePalette(colors3Hex);

/**
 * TESTS
 */

describe('index', function(){
  describe('#preparePalette', function (){
    it('should convert hex through to Lab',
      function() {
        var original = ["#fFfFfF", "#abcdef", "#000000"];
        var prepared = colorDiff.preparePalette(original);
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
         assert.deepEqual(colorDiff.closest(whiteHex, colors1Hex), whiteHex);
         assert.deepEqual(colorDiff.closest(blackHex, colors1Hex), blackHex);
         assert.deepEqual(colorDiff.closest(navyHex, colors1Hex), navyHex);
         assert.deepEqual(colorDiff.closest(blueHex, colors1Hex), blueHex);
         assert.deepEqual(colorDiff.closest(yellowHex, colors1Hex), yellowHex);
         assert.deepEqual(colorDiff.closest(goldHex, colors1Hex), goldHex);

         assert.deepEqual(colorDiff.closest(whiteHex, colors2Hex), whiteHex);
         assert.deepEqual(colorDiff.closest(blackHex, colors2Hex), blackHex);
         assert.deepEqual(colorDiff.closest(navyHex, colors2Hex), blueHex);
         assert.deepEqual(colorDiff.closest(blueHex, colors2Hex), blueHex);
         assert.deepEqual(colorDiff.closest(yellowHex, colors2Hex), goldHex);
         assert.deepEqual(colorDiff.closest(goldHex, colors2Hex), goldHex);
      });

    it('should find correct furthest colors',
      function() {
         assert.deepEqual(colorDiff.furthest(whiteHex, colors3Hex), blackHex);
         assert.deepEqual(colorDiff.furthest(blackHex, colors3Hex), yellowHex);
         assert.deepEqual(colorDiff.furthest(navyHex, colors3Hex), yellowHex);
         assert.deepEqual(colorDiff.furthest(blueHex, colors3Hex), yellowHex);
         assert.deepEqual(colorDiff.furthest(yellowHex, colors3Hex), blueHex);
         assert.deepEqual(colorDiff.furthest(goldHex, colors3Hex), blueHex);
      });
  })

  describe('process hex prepared palette', function (){
    it('should find correct closest colors',
      function() {
         assert.deepEqual(colorDiff.closest(whiteHex, colors1HexPrepared), whiteHex);
         assert.deepEqual(colorDiff.closest(blackHex, colors1HexPrepared), blackHex);
         assert.deepEqual(colorDiff.closest(navyHex, colors1HexPrepared), navyHex);
         assert.deepEqual(colorDiff.closest(blueHex, colors1HexPrepared), blueHex);
         assert.deepEqual(colorDiff.closest(yellowHex, colors1HexPrepared), yellowHex);
         assert.deepEqual(colorDiff.closest(goldHex, colors1HexPrepared), goldHex);

         assert.deepEqual(colorDiff.closest(whiteHex, colors2HexPrepared), whiteHex);
         assert.deepEqual(colorDiff.closest(blackHex, colors2HexPrepared), blackHex);
         assert.deepEqual(colorDiff.closest(navyHex, colors2HexPrepared), blueHex);
         assert.deepEqual(colorDiff.closest(blueHex, colors2HexPrepared), blueHex);
         assert.deepEqual(colorDiff.closest(yellowHex, colors2HexPrepared), goldHex);
         assert.deepEqual(colorDiff.closest(goldHex, colors2HexPrepared), goldHex);
      });

    it('should find correct furthest colors',
      function() {
         assert.deepEqual(colorDiff.furthest(whiteHex, colors3HexPrepared), blackHex);
         assert.deepEqual(colorDiff.furthest(blackHex, colors3HexPrepared), yellowHex);
         assert.deepEqual(colorDiff.furthest(navyHex, colors3HexPrepared), yellowHex);
         assert.deepEqual(colorDiff.furthest(blueHex, colors3HexPrepared), yellowHex);
         assert.deepEqual(colorDiff.furthest(yellowHex, colors3HexPrepared), blueHex);
         assert.deepEqual(colorDiff.furthest(goldHex, colors3HexPrepared), blueHex);
      });
  })
});

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
