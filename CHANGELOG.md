# Changelog

## 1.4.0

* Use ESM modules. Backwards compatible with CJS using rollup.
* Replaced nyc with c8 (nyc does not support esm).

## 1.3.0

* don't support mixing casing for r,g,b properties, either all upper or all lower
* use camelCase instead of snake_case
* snake_case -> camelCase mappings are still present to not break more dependents than necessary.
* fixed jsdoc types and type checking using tsc
* only run tests on node > 18
* no more travis, use github actions
* bumped all deps
* added linting
