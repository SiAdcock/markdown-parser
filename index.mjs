#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import pify from 'pify';

const read = pify(fs.readFile);
const write = pify(fs.writeFile);
const mkdir = pify(fs.mkdir);
const access = pify(fs.access);

const buildTree = async function buildTree() {
    const content = await read(path.join('markdown', 'index.md'), 'utf-8');
    const lines = content.split('\n');

    return lines.reduce((acc, line) => {
        if (line.startsWith('# ')) {
            acc.push({
                h1: line.split('# ')[1],
            });
        }

        return acc;
    }, []);
};

const generateHtml = async function generateHtml(tree) {
    const filePath = path.join('dist', 'index.html');
    const lines = tree.reduce((acc, line) => {
        if (line.h1) {
            acc.push(`<h1>${line.h1}</h1>`);
        }

        return acc;
    }, []);

    await access('dist').catch(() => mkdir('dist'));
    fs.createWriteStream(filePath);
    write(filePath, lines.join('\n'));
};

buildTree().then(tree => generateHtml(tree));
