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

import * as assert from "assert";

import { rgbaToLab, normalize } from "../lib/convert.js";

/**
 * TESTS
 */

describe("convert", () => {
  describe("#rgbaToLab()", () => {
    it("should convert to expected lab color #1", () => {
      assert.deepStrictEqual({ L: 40.473, a: -6.106, b: -21.417 },
        roundAll(rgbaToLab({
          R: 55,
          G: 100,
          B: 130,
        })));
    });
    it("should convert to expected lab color #2", () => {
      assert.deepStrictEqual({ L: 0, a: 0, b: 0 },
        roundAll(rgbaToLab({
          R: 0,
          G: 0,
          B: 0,
        })));
    });
    it("should convert to expected lab color #3", () => {
      assert.deepStrictEqual({ L: 100, a: 0.005, b: -0.010 },
        roundAll(rgbaToLab({
          R: 255,
          G: 255,
          B: 255,
        })));
    });
    it("should convert to expected lab color #4", () => {
      assert.deepStrictEqual({ L: 100, a: 0.005, b: -0.010 },
        roundAll(rgbaToLab({
          R: 255,
          G: 255,
          B: 255,
          A: 1.0,
        })));
    });
    it("should convert to expected lab color #5", () => {
      assert.deepStrictEqual({ L: 100, a: 0.005, b: -0.010 },
        roundAll(rgbaToLab({
          R: 0,
          G: 0,
          B: 0,
          A: 0.0,
        })));
    });
    it("should convert to expected lab color #6", () => {
      assert.deepStrictEqual({ L: 53.389, a: 0.003, b: -0.006 },
        roundAll(rgbaToLab({
          R: 0,
          G: 0,
          B: 0,
          A: 0.5,
        })));
    });
  });
  it("should convert to expected lab color #6 from lowercase RGBA object", () => {
    assert.deepStrictEqual({ L: 53.389, a: 0.003, b: -0.006 },
      roundAll(rgbaToLab({
        r: 0,
        g: 0,
        b: 0,
        a: 0.5,
      })));
  });
});

describe("#normalize()", () => {
  it("should convert lowercase RGB props to uppercase", () => {
    assert.deepStrictEqual({ R: 55, G: 255, B: 0 },
      normalize({
        r: 55,
        g: 255,
        b: 0,
      }));
  });
  it("should convert lowercase RGBA props to uppercase", () => {
    assert.deepStrictEqual({ R: 55, G: 255, B: 0, A: 0 },
      normalize({
        r: 55,
        g: 255,
        b: 0,
        a: 0,
      }));
  });
});

/**
 * INTERNAL FUNCTIONS
 */

/**
 *
 * @param {import("../").LabColor} c
 * @returns {import("../").LabColor}
 */
function roundAll(c) {
  return {
    L: round(c.L),
    a: round(c.a),
    b: round(c.b),
  };
}

/**
 *
 * @param {number} n
 * @returns {number}
 */
function round(n) {
  return Math.round(n * 1000) / 1000;
}
