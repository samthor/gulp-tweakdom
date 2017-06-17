/*
 * Copyright 2017 Sam Thorogood. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

const domToHtml = require('jsdom/lib/jsdom/browser/domtohtml').domToHtml;
const parser = new (require('jsdom/lib/jsdom/living')).DOMParser();
const through2 = require('through2');
const PluginError = require('plugin-error');

module.exports = function(mutator) {
  return through2.obj(function(file, enc, cb) {
    if (file.isNull() || !file.path.match(/\.html$/)) {
      return stream.push(file);
    }
    if (file.isStream()) {
      throw new PluginError('mutate_html', 'No stream support');
    }
    const src = file.contents.toString();
    try {
      const doc = parser.parseFromString(src, 'text/html');

      // if the mutator returns a Node, use its innerHTML: otherwise, the whole doc.
      const out = mutator(doc, file.path);
      const s = out ? out.innerHTML : domToHtml([doc]);

      file.contents = new Buffer(s);
    } catch (e) {
      // TODO(samthor): throwing errors inside through2 does nothing :|
      this.emit('error', e);
      return;
    }

    this.push(file);
    cb();
  });
};
