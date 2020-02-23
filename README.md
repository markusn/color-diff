# Color-diff
[![Build Status](https://travis-ci.org/markusn/color-diff.png)](https://travis-ci.org/markusn/color-diff)
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

	npm test


## Usage

```js
var diff = require('color-diff');
```

### diff.closest(color, palette, bc)

Returns the closest color. The parameter bc is optional and is used as
background color when the color and/or palette uses alpha channels.

```js
var color = { R: 255, G: 1, B: 30 };
// red, green, blue
var palette = [ {R: 255, G: 0, B: 0 },
                {R: 0, G: 255, B: 0 },
                {R: 0, G: 0, B: 255} ];

diff.closest(color, palette); // {R: 255, G: 0, B: 0 }, red
```

The result above is obvious, but `diff.closest` could deal with more complicated
cases.

### diff.furthest(color, palette, bc)

Returns the most different color. The parameter bc is optional and is used as
background color when the color and/or palette uses alpha channels.

```js
var color = { R: 255, G: 255, B: 255 };
// black, white
var palette = [ {R: 0, G: 0, B: 0 }, {R: 255, G: 255, B: 255 } ];

diff.furthest(color, palette); // {R: 0, G: 0, B: 0 }, black
```

The result above is obvious, but `diff.furthest` could deal with more
complicated cases.


### diff.map_palette(palette1, palette2)

Returns a mapping from the colors in palette1 to palette2.


#### color
`Object`

`color` is an object containing 3 properties: 'R', 'G', 'B' (case insensitive), such as:

```js
{ R: 255, G: 1, B: 0 }
```

There is an optional property 'A', which specifies the alpha channel between 0.0
and 1.0.

Each RGBA-color is transformed into a RGB-color before being used to calculate
the CIEDE2000 difference, using the specified background color
(defaults to white).

#### palette

`Array.<Object>`

Color palette array which contains many `color`-like objects.


## Author
Markus Ekholm

## License
3-clause BSD. For details see `COPYING`.
