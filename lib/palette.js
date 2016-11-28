/**
 * @author Markus Ekholm
 * @copyright 2012-2016 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012-2016, Markus Ekholm
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

import {ciede2000} from './diff'
import {rgb_to_lab, rgba_to_lab} from './convert'

function _diff(c1, c2, bc) { // internal
  let conv_c1 = rgb_to_lab
  let conv_c2 = rgb_to_lab
  let rgba_conv = function (x) {
    return rgba_to_lab(x, bc)
  }
  if ("A" in c1) conv_c1 = rgba_conv
  if ("A" in c2) conv_c2 = rgba_conv
  c1 = conv_c1(c1)
  c2 = conv_c2(c2)
  return ciede2000(c1, c2)
}

/**
 * Returns the hash key used for a {rgbcolor} in a {palettemap}
 * @param {{R,G,B,[A]}} c
 * @return {string}
 */
export function palette_map_key(c) {
  let s = "R" + c.R + "B" + c.B + "G" + c.G
  if ("A" in c) s = s + "A" + c.A
  return s
}

/**
 * Returns a mapping from each color in a to the closest color in b
 * @param {{R,G,B}[]} a each element should have fields R,G,B
 * @param {{R,G,B}[]} b each element should have fields R,G,B
 * @param {{R,G,B}} [bc] background color when using alpha channels
 * @param {string} type should be the string 'closest' or 'furthest'
 * @return {Object} palettemap
 */
export function map_palette(a, b, type = 'closest', bc = {R: 255, G: 255, B: 255}) {
  let c = {}
  for (let idx1 = 0; idx1 < a.length; idx1 += 1) {
    let color1 = a[idx1]
    let best_color = undefined
    let best_color_diff = undefined
    for (let idx2 = 0; idx2 < b.length; idx2 += 1) {
      let color2 = b[idx2]
      let current_color_diff = _diff(color1, color2, bc)

      if ((best_color == undefined) || ((type === 'closest') && (current_color_diff < best_color_diff))) {
        best_color = color2
        best_color_diff = current_color_diff
        continue
      }
      if ((type === 'furthest') && (current_color_diff > best_color_diff)) {
        best_color = color2
        best_color_diff = current_color_diff
        continue
      }
    }
    c[palette_map_key(color1)] = best_color
  }
  return c
}
