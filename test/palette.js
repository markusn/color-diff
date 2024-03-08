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

import * as assert from "node:assert";
import { describe, it } from "node:test";

import * as colorPalette from "../lib/palette.js";
import { rgbaToLab } from "../lib/convert.js";

/**
 * CONSTANTS
 */

const white = { R: 255, G: 255, B: 255 };
const black = { R: 0, G: 0, B: 0 };
const navy = { R: 0, G: 0, B: 128 };
const blue = { R: 0, G: 0, B: 255 };
const yellow = { R: 255, G: 255, B: 0 };
const gold = { R: 255, G: 215, B: 0 };

const whiteLab = rgbaToLab(white);
const blackLab = rgbaToLab(black);
const navyLab = rgbaToLab(navy);
const blueLab = rgbaToLab(blue);
const yellowLab = rgbaToLab(yellow);
const goldLab = rgbaToLab(gold);

const colors1 = [ white, black, navy, blue, yellow, gold ];
const colors1Lab = [ whiteLab, blackLab, navyLab, blueLab, yellowLab, goldLab ];
const colors2 = [ white, black, blue, gold ];
const colors2Lab = [ whiteLab, blackLab, blueLab, goldLab ];
const colors3 = [ white, black, yellow, blue ];
const colors3Lab = [ whiteLab, blackLab, yellowLab, blueLab ];

const whiteA = { R: 255, G: 255, B: 255, A: 1.0 };
const blackA = { R: 0, G: 0, B: 0, A: 1.0 };
const navyA = { R: 0, G: 0, B: 128, A: 1.0 };
const blueA = { R: 0, G: 0, B: 255, A: 1.0 };
const yellowA = { R: 255, G: 255, B: 0, A: 1.0 };
const goldA = { R: 255, G: 215, B: 0, A: 1.0 };
const colors1A = [ whiteA, blackA, navyA, blueA, yellowA, goldA ];

const whiteALab = rgbaToLab(whiteA);
const blackALab = rgbaToLab(blackA);
const navyALab = rgbaToLab(navyA);
const blueALab = rgbaToLab(blueA);
const yellowALab = rgbaToLab(yellowA);
const goldALab = rgbaToLab(goldA);
const colors1ALab = [ whiteALab, blackALab, navyALab, blueALab, yellowALab, goldALab ];

const whiteAlower = { r: 255, g: 255, b: 255, a: 1.0 };
const blackAlower = { r: 0, g: 0, b: 0, a: 1.0 };
const navyAlower = { r: 0, g: 0, b: 128, a: 1.0 };
const blueAlower = { r: 0, g: 0, b: 255, a: 1.0 };
const yellowAlower = { r: 255, g: 255, b: 0, a: 1.0 };
const goldAlower = { r: 255, g: 215, b: 0, a: 1.0 };
const colors1Alower = [ whiteAlower, blackAlower, navyAlower, blueAlower, yellowAlower, goldAlower ];

/**
 * TESTS
 */

describe("palette", () => {
  describe("#mapPalette()", () => {
    it("should map all colors to themselves when possible #1",
      () => {
        /** @type {import("../").PaletteMap} */
        const expected11 = {};
        expected11[colorPalette.paletteMapKey(white)] = white;
        expected11[colorPalette.paletteMapKey(black)] = black;
        expected11[colorPalette.paletteMapKey(navy)] = navy;
        expected11[colorPalette.paletteMapKey(blue)] = blue;
        expected11[colorPalette.paletteMapKey(yellow)] = yellow;
        expected11[colorPalette.paletteMapKey(gold)] = gold;
        assert.deepStrictEqual(expected11,
          colorPalette.mapPalette(colors1, colors1));
      });
    it("should map all colors to themselves when possible #2",
      () => {
        /** @type {import("../").PaletteMap} */
        const expected12 = {};
        expected12[colorPalette.paletteMapKey(whiteA)] = whiteA;
        expected12[colorPalette.paletteMapKey(blackA)] = blackA;
        expected12[colorPalette.paletteMapKey(navyA)] = navyA;
        expected12[colorPalette.paletteMapKey(blueA)] = blueA;
        expected12[colorPalette.paletteMapKey(yellowA)] = yellowA;
        expected12[colorPalette.paletteMapKey(goldA)] = goldA;
        assert.deepStrictEqual(expected12,
          colorPalette.mapPalette(colors1A, colors1A));
      });
    it("should map navy->blue and yellow->gold when navy and yellow are missing",
      () => {
        /** @type {import("../").PaletteMap} */
        const expected2 = {};
        expected2[colorPalette.paletteMapKey(white)] = white;
        expected2[colorPalette.paletteMapKey(black)] = black;
        expected2[colorPalette.paletteMapKey(navy)] = blue;
        expected2[colorPalette.paletteMapKey(blue)] = blue;
        expected2[colorPalette.paletteMapKey(yellow)] = gold;
        expected2[colorPalette.paletteMapKey(gold)] = gold;
        assert.deepStrictEqual(expected2,
          colorPalette.mapPalette(colors1, colors2));
      });
    it("should map white->black & black,navy,blue->yellow & yellow,gold->blue",
      () => {
        /** @type {import("../").PaletteMap} */
        const expected3 = {};
        expected3[colorPalette.paletteMapKey(white)] = black;
        expected3[colorPalette.paletteMapKey(black)] = yellow;
        expected3[colorPalette.paletteMapKey(navy)] = yellow;
        expected3[colorPalette.paletteMapKey(blue)] = yellow;
        expected3[colorPalette.paletteMapKey(yellow)] = blue;
        expected3[colorPalette.paletteMapKey(gold)] = blue;
        assert.deepStrictEqual(expected3,
          colorPalette.mapPalette(colors1,
            colors3,
            "furthest"));
      });

    it("should map all colors to their uppercase versions when lowercase RGBA was inputted",
      () => {
        /** @type {import("../").PaletteMap} */
        const expected4 = {};
        expected4[colorPalette.paletteMapKey(whiteAlower)] = whiteA;
        expected4[colorPalette.paletteMapKey(blackAlower)] = blackA;
        expected4[colorPalette.paletteMapKey(navyAlower)] = navyA;
        expected4[colorPalette.paletteMapKey(blueAlower)] = blueA;
        expected4[colorPalette.paletteMapKey(yellowAlower)] = yellowA;
        expected4[colorPalette.paletteMapKey(goldAlower)] = goldA;
        assert.deepStrictEqual(expected4,
          colorPalette.mapPalette(colors1Alower, colors1A, "closest", whiteAlower));
      });

    it("should output an empty palette map if the second palette is empty", () => {
      assert.deepStrictEqual({}, colorPalette.mapPalette(colors1A, [], "closest"));
    });
  });

  describe("#mapPaletteLab()", () => {
    it("should map all colors to themselves when possible #1",
      () => {
        /** @type {import("../lib/palette").PaletteMapLab} */
        const expected11 = {};
        expected11[colorPalette.labPaletteMapKey(whiteLab)] = whiteLab;
        expected11[colorPalette.labPaletteMapKey(blackLab)] = blackLab;
        expected11[colorPalette.labPaletteMapKey(navyLab)] = navyLab;
        expected11[colorPalette.labPaletteMapKey(blueLab)] = blueLab;
        expected11[colorPalette.labPaletteMapKey(yellowLab)] = yellowLab;
        expected11[colorPalette.labPaletteMapKey(goldLab)] = goldLab;
        assert.deepStrictEqual(expected11,
          colorPalette.mapPaletteLab(colors1Lab, colors1Lab));
      });
    it("should map all colors to themselves when possible #2",
      () => {
        /** @type {import("../lib/palette").PaletteMapLab} */
        const expected12 = {};
        expected12[colorPalette.labPaletteMapKey(whiteALab)] = whiteALab;
        expected12[colorPalette.labPaletteMapKey(blackALab)] = blackALab;
        expected12[colorPalette.labPaletteMapKey(navyALab)] = navyALab;
        expected12[colorPalette.labPaletteMapKey(blueALab)] = blueALab;
        expected12[colorPalette.labPaletteMapKey(yellowALab)] = yellowALab;
        expected12[colorPalette.labPaletteMapKey(goldALab)] = goldALab;
        assert.deepStrictEqual(expected12,
          colorPalette.mapPaletteLab(colors1ALab, colors1ALab));
      });
    it("should map navy->blue and yellow->gold when navy and yellow are missing",
      () => {
        /** @type {import("../lib/palette").PaletteMapLab} */
        const expected2 = {};
        expected2[colorPalette.labPaletteMapKey(whiteLab)] = whiteLab;
        expected2[colorPalette.labPaletteMapKey(blackLab)] = blackLab;
        expected2[colorPalette.labPaletteMapKey(navyLab)] = blueLab;
        expected2[colorPalette.labPaletteMapKey(blueLab)] = blueLab;
        expected2[colorPalette.labPaletteMapKey(yellowLab)] = goldLab;
        expected2[colorPalette.labPaletteMapKey(goldLab)] = goldLab;
        assert.deepStrictEqual(expected2,
          colorPalette.mapPaletteLab(colors1Lab, colors2Lab));
      });
    it("should map white->black & black,navy,blue->yellow & yellow,gold->blue",
      () => {
        /** @type {import("../lib/palette").PaletteMapLab} */
        const expected3 = {};
        expected3[colorPalette.labPaletteMapKey(whiteLab)] = blackLab;
        expected3[colorPalette.labPaletteMapKey(blackLab)] = yellowLab;
        expected3[colorPalette.labPaletteMapKey(navyLab)] = yellowLab;
        expected3[colorPalette.labPaletteMapKey(blueLab)] = yellowLab;
        expected3[colorPalette.labPaletteMapKey(yellowLab)] = blueLab;
        expected3[colorPalette.labPaletteMapKey(goldLab)] = blueLab;
        assert.deepStrictEqual(expected3,
          colorPalette.mapPaletteLab(colors1Lab,
            colors3Lab,
            "furthest"));
      });

  });

  describe("#matchPaletteLab()", () => {
    it("should match mapPalette results for closest",
      () => {
        assert.deepStrictEqual(colorPalette.matchPaletteLab(whiteLab, colors1Lab), whiteLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(blackLab, colors1Lab), blackLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(navyLab, colors1Lab), navyLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(blueLab, colors1Lab), blueLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(yellowLab, colors1Lab), yellowLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(goldLab, colors1Lab), goldLab);

        assert.deepStrictEqual(colorPalette.matchPaletteLab(whiteLab, colors2Lab), whiteLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(blackLab, colors2Lab), blackLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(navyLab, colors2Lab), blueLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(blueLab, colors2Lab), blueLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(yellowLab, colors2Lab), goldLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(goldLab, colors2Lab), goldLab);
      });

    it("should match mapPalette results for furthest",
      () => {
        assert.deepStrictEqual(colorPalette.matchPaletteLab(whiteLab, colors3Lab, true), blackLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(blackLab, colors3Lab, true), yellowLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(navyLab, colors3Lab, true), yellowLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(blueLab, colors3Lab, true), yellowLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(yellowLab, colors3Lab, true), blueLab);
        assert.deepStrictEqual(colorPalette.matchPaletteLab(goldLab, colors3Lab, true), blueLab);
      });
  });
});
