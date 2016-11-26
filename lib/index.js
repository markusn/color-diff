import {ciede2000} from './diff'
import {rgb_to_lab, rgba_to_lab} from './convert'
import {map_palette, palette_map_key} from './palette'


function closest(target, relative, bc = {R: 255, G: 255, B: 255}) {
  let key = palette_map_key(target)
  let result = map_palette([target], relative, 'closest', bc)
  return result[key]
}

function furthest(target, relative, bc = {R: 255, G: 255, B: 255}) {
  let key = palette_map_key(target)
  let result = map_palette([target], relative, 'furthest', bc)
  return result[key]
}

export let Color = {
  ciede2000,
  rgb_to_lab,
  rgba_to_lab,
  closest,
  furthest
}
