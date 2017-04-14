/**
 * IMPORTS
 */
var assert        = require('assert');
var colorDiff     = require('../lib/index');
var color_convert = require('../lib/convert');

/**
 * CONSTANTS
 */

var white   = {'R':255 , 'G':255 ,'B':255};
var black   = {'R':0   , 'G':0   ,'B':0};
var navy    = {'R':0   , 'G':0   ,'B':128};
var blue    = {'R':0   , 'G':0   ,'B':255};
var yellow  = {'R':255 , 'G':255 ,'B':0};
var gold    = {'R':255 , 'G':215 ,'B':0};

var whiteHex   = {'R':255 , 'G':255 ,'B':255};
var blackHex   = {'R':0   , 'G':0   ,'B':0};
var navyHex    = {'R':0   , 'G':0   ,'B':128};
var blueHex    = {'R':0   , 'G':0   ,'B':255};
var yellowHex  = {'R':255 , 'G':255 ,'B':0};
var goldHex    = {'R':255 , 'G':215 ,'B':0};

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
         assert.deepEqual(colorDiff.process(white, colors1), white);
         assert.deepEqual(colorDiff.process(black, colors1), black);
         assert.deepEqual(colorDiff.process(navy, colors1), navy);
         assert.deepEqual(colorDiff.process(blue, colors1), blue);
         assert.deepEqual(colorDiff.process(yellow, colors1), yellow);
         assert.deepEqual(colorDiff.process(gold, colors1), gold);

         assert.deepEqual(colorDiff.process(white, colors2), white);
         assert.deepEqual(colorDiff.process(black, colors2), black);
         assert.deepEqual(colorDiff.process(navy, colors2), blue);
         assert.deepEqual(colorDiff.process(blue, colors2), blue);
         assert.deepEqual(colorDiff.process(yellow, colors2), gold);
         assert.deepEqual(colorDiff.process(gold, colors2), gold);
      });
    it('should find correct furthest colors',
      function() {
         assert.deepEqual(colorDiff.process(white, colors3, true), black);
         assert.deepEqual(colorDiff.process(black, colors3, true), yellow);
         assert.deepEqual(colorDiff.process(navy, colors3, true), yellow);
         assert.deepEqual(colorDiff.process(blue, colors3, true), yellow);
         assert.deepEqual(colorDiff.process(yellow, colors3, true), blue);
         assert.deepEqual(colorDiff.process(gold, colors3, true), blue);
      });
  });

  describe('process hex', function (){
    it('should find correct closest colors',
      function() {
         assert.deepEqual(colorDiff.process(whiteHex, colors1Hex), whiteHex);
         assert.deepEqual(colorDiff.process(blackHex, colors1Hex), blackHex);
         assert.deepEqual(colorDiff.process(navyHex, colors1Hex), navyHex);
         assert.deepEqual(colorDiff.process(blueHex, colors1Hex), blueHex);
         assert.deepEqual(colorDiff.process(yellowHex, colors1Hex), yellowHex);
         assert.deepEqual(colorDiff.process(goldHex, colors1Hex), goldHex);

         assert.deepEqual(colorDiff.process(whiteHex, colors2Hex), whiteHex);
         assert.deepEqual(colorDiff.process(blackHex, colors2Hex), blackHex);
         assert.deepEqual(colorDiff.process(navyHex, colors2Hex), blueHex);
         assert.deepEqual(colorDiff.process(blueHex, colors2Hex), blueHex);
         assert.deepEqual(colorDiff.process(yellowHex, colors2Hex), goldHex);
         assert.deepEqual(colorDiff.process(goldHex, colors2Hex), goldHex);
      });

    it('should find correct furthest colors',
      function() {
         assert.deepEqual(colorDiff.process(whiteHex, colors3Hex, true), blackHex);
         assert.deepEqual(colorDiff.process(blackHex, colors3Hex, true), yellowHex);
         assert.deepEqual(colorDiff.process(navyHex, colors3Hex, true), yellowHex);
         assert.deepEqual(colorDiff.process(blueHex, colors3Hex, true), yellowHex);
         assert.deepEqual(colorDiff.process(yellowHex, colors3Hex, true), blueHex);
         assert.deepEqual(colorDiff.process(goldHex, colors3Hex, true), blueHex);
      });
  })

  describe('process hex prepared palette', function (){
    it('should find correct closest colors',
      function() {
         assert.deepEqual(colorDiff.process(whiteHex, colors1HexPrepared), whiteHex);
         assert.deepEqual(colorDiff.process(blackHex, colors1HexPrepared), blackHex);
         assert.deepEqual(colorDiff.process(navyHex, colors1HexPrepared), navyHex);
         assert.deepEqual(colorDiff.process(blueHex, colors1HexPrepared), blueHex);
         assert.deepEqual(colorDiff.process(yellowHex, colors1HexPrepared), yellowHex);
         assert.deepEqual(colorDiff.process(goldHex, colors1HexPrepared), goldHex);

         assert.deepEqual(colorDiff.process(whiteHex, colors2HexPrepared), whiteHex);
         assert.deepEqual(colorDiff.process(blackHex, colors2HexPrepared), blackHex);
         assert.deepEqual(colorDiff.process(navyHex, colors2HexPrepared), blueHex);
         assert.deepEqual(colorDiff.process(blueHex, colors2HexPrepared), blueHex);
         assert.deepEqual(colorDiff.process(yellowHex, colors2HexPrepared), goldHex);
         assert.deepEqual(colorDiff.process(goldHex, colors2HexPrepared), goldHex);
      });

    it('should find correct furthest colors',
      function() {
         assert.deepEqual(colorDiff.process(whiteHex, colors3HexPrepared, true), blackHex);
         assert.deepEqual(colorDiff.process(blackHex, colors3HexPrepared, true), yellowHex);
         assert.deepEqual(colorDiff.process(navyHex, colors3HexPrepared, true), yellowHex);
         assert.deepEqual(colorDiff.process(blueHex, colors3HexPrepared, true), yellowHex);
         assert.deepEqual(colorDiff.process(yellowHex, colors3HexPrepared, true), blueHex);
         assert.deepEqual(colorDiff.process(goldHex, colors3HexPrepared, true), blueHex);
      });
  })
});

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
