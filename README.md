# gulp-tweakdom

Wraps up [jsdom](https://github.com/tmpvar/jsdom) in a easy-to-use Gulp API that allows for DOM manipulation.
Doesn't run code, load resources etc.
Install via [NPM](https://www.npmjs.com/package/gulp-tweakdom) or Yarn.

Usage-

```js
const gulp = require('gulp');
const tweakdom = require('gulp-tweakdom');

gulp.task('html', function() {
  const mutator = document => {
    const title = document.head.querySelector('title');
    if (title) {
      title.textContent = 'A New Title';
    }
  };
  return gulp.src('*.html')
      .pipe(tweakdom(mutator))
      .pipe(gulp.dest('./dist'));
})
```

If you return a node from the mutator function, its `.innerHTML` will be used for output.
This can be useful if you're manipulating a HTML partial, as jsdom will otherwise add `<head>`, `<body>` etc.

For example, to modify this patial-

```html
<div id="foo">
  Test file
</div>
```

Use a mutator that returns `document.body`, as jsdom parses the partial there-

```js
function mutator(document) {
  document.getElementById('foo').textContent = 'Hooray, partial';
  return document.body;
}
```

## TODO

* Don't use jsdom, it's an enormous dependency.
