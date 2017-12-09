#!/usr/bin/env node

import path from 'path';
import buildBlocksMap from './src/blocks.mjs';
import generateHtml from './src/html.mjs';

buildBlocksMap(
    path.join('markdown', 'index.md'),
    path.join('markdown', 'index2.md')
).then(blocksMap => {
    generateHtml(blocksMap);
});
