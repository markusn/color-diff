# color-diff

[![Build Status](https://github.com/markusn/color-diff/actions/workflows/build-latest.yaml/badge.svg?branch=master)](https://github.com/markusn/color-diff/actions/workflows/build-latest.yaml)
[![Coverage Status](https://coveralls.io/repos/markusn/color-diff/badge.png?branch=master)](https://coveralls.io/r/markusn/color-diff?branch=master)

Implements the CIEDE2000 color difference algorithm, conversion between RGB and
LAB color and mapping all colors in palette X to the closest color in palette Y
based on the CIEDE2000 difference.

## Installation

```bash
npm install color-diff --save
```

## Tests

Are located in the `test/` folder and are run by:

```bash
npm test
```

## Usage

```js
// CommonJS
const { 
  closest, 
  furthest,
  diff, 
  mapPalette,
  paletteMapKey,
  rgbaToLab,
  mapPaletteLab,
  labPaletteMapKey,
} = require("color-diff");

// ESM
import {
  closest,
  furthest,
  diff,
  mapPalette,
  paletteMapKey,
  rgbaToLab,
  mapPaletteLab,
  labPaletteMapKey,
} from "color-diff";
```

### closest(color, palette, bc)

Returns the closest color. The parameter bc is optional and is used as
background color when the color and/or palette uses alpha channels.

```js
const color = { R: 255, G: 1, B: 30 };
// red, green, blue
const palette = [ {R: 255, G: 0, B: 0 },
                {R: 0, G: 255, B: 0 },
                {R: 0, G: 0, B: 255} ];

closest(color, palette); // {R: 255, G: 0, B: 0 }, red
```

The result above is obvious, but `diff.closest` could deal with more complicated
cases.

### furthest(color, palette, bc)

Returns the most different color. The parameter bc is optional and is used as
background color when the color and/or palette uses alpha channels.

```js
const color = { R: 255, G: 255, B: 255 };
// black, white
const palette = [ {R: 0, G: 0, B: 0 }, {R: 255, G: 255, B: 255 } ];

furthest(color, palette); // {R: 0, G: 0, B: 0 }, black
```

The result above is obvious, but `diff.furthest` could deal with more
complicated cases.

### mapPalette(palette1, palette2)

Returns a mapping from the colors in palette1 to palette2.

### paletteMapKey(color)

Return the palette map key for the color, to be used with the result from mapPalette.

### diff(color1, color2, bc)

Returns the difference between the lab colors color1 and color2. The parameter bc is optional and
is used as background color when one of the colors uses alpha channels.

#### rgba color

`Object`

`RGBAColor` is an object containing 4 properties: 'R', 'G', 'B', 'A', where 'A' is optional OR
'r', 'g', 'b', 'a', where 'a' is optional . Such as:

```js
{ R: 255, G: 1, B: 0 }
```

There is an optional property 'A', which specifies the alpha channel between 0.0
and 1.0. If not present the color will be treated as fully opaque, i.e. A = 1.0.

Each RGBA-color is transformed into a RGB-color before being used to calculate
the CIEDE2000 difference, using the specified background color
(defaults to white).

### lab color

`Object`

`LabColor` is an object containing 3 properties 'L', 'a', 'b' such as:

```js
{ L: 100, a: 0.005, b: -0.010 }
```

#### palette

`Array.<RGBAColor>`

Color palette array which contains many `RGBAColor` objects.

## Author

Markus Ekholm

## License

3-clause BSD. For details see `COPYING`.
