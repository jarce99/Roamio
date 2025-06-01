#!/bin/bash

# Create minified directory if it doesn't exist
mkdir -p assets/minified

# Minify JavaScript files
for file in assets/*.js; do
  if [[ $file != *".min.js" ]]; then
    filename=$(basename "$file" .js)
    uglifyjs "$file" -c -m -o "assets/minified/$filename.min.js"
  fi
done

# Minify CSS files
for file in assets/*.css; do
  if [[ $file != *".min.css" ]]; then
    filename=$(basename "$file" .css)
    cleancss -o "assets/minified/$filename.min.css" "$file"
  fi
done

echo "Assets optimization complete!" 