#!/usr/bin/env node

import path from 'path';
import buildBlockMap from './src/blocks.mjs';
import generateHtml from './src/html.mjs';

buildBlockMap(
    path.join('markdown', 'index.md'),
    path.join('markdown', 'index2.md')
).then(generateHtml);
