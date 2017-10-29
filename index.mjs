#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

fs.readFile(path.join('markdown', 'index.md'), 'utf-8', (err, content) => {
  console.log(content);
});
