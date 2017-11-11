#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import pify from 'pify';

const read = pify(fs.readFile);

const buildTree = async function() {
    const content = await read(path.join('markdown', 'index.md'), 'utf-8');

    return content;
};

buildTree().then(res => console.log(res));
