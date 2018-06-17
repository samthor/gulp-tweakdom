'use strict';

const gulp = require('gulp');
const tweakdom = require('../index.js');

gulp.task('default', function() {
  const mutator = (document, file) => {
    document.title = 'Replaced';

    const heading = Object.assign(document.createElement('h1'), {textContent: 'Test OK'});
    document.body.appendChild(heading);
  };
  return gulp.src('test.html')
    .pipe(tweakdom(mutator))
    .pipe(gulp.dest('./dist'));
});