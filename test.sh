#!/bin/sh
set -e
for filename in test/*.js; do node "${filename}"; done

