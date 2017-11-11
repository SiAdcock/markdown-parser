#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import pify from 'pify';

const read = pify(fs.readFile);
const write = pify(fs.writeFile);
const mkdir = pify(fs.mkdir);
const access = pify(fs.access);

const buildTree = async function buildTree(markdownFile) {
    const content = await read(markdownFile, 'utf-8');
    const lines = content.split('\n');
    const basename = path.basename(markdownFile, '.md');

    return {
        [basename]: lines.reduce((acc, line) => {
            if (line.startsWith('# ')) {
                acc.push({
                    h1: line.split('# ')[1],
                });
            }

            return acc;
        }, []),
    };
};

const buildTrees = async function buildTrees(...markdownFiles) {
    return markdownFiles.reduce(async function(acc, file) {
        const currentTree = await buildTree(file);

        return Object.assign({}, acc, currentTree);
    }, {});
};

const generateHtml = async function generateHtml(trees) {
    const htmlStrMap = Object.keys(trees).reduce((treesAcc, tree) => {
        const htmlString = trees[tree]
            .reduce((acc, line) => {
                if (line.h1) {
                    acc.push(`<h1>${line.h1}</h1>`);
                }

                return acc;
            }, [])
            .join('\n');

        return Object.assign({}, treesAcc, { [tree]: htmlString });
    }, {});

    await access('dist').catch(() => mkdir('dist'));

    Object.keys(htmlStrMap).forEach(filename => {
        const filePath = path.join('dist', `${filename}.html`);

        fs.createWriteStream(filePath);
        write(filePath, htmlStrMap[filename]);
    });
};

buildTrees(
    path.join('markdown', 'index.md'),
    path.join('markdown', 'index2.md')
).then(generateHtml);
