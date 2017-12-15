import fs from 'fs';
import path from 'path';
import pify from 'pify';
import parse from './parse.mjs';

const read = pify(fs.readFile);

const buildBlocks = async function buildTree(markdownFile) {
    const content = await read(markdownFile, 'utf-8');
    const lines = content.split('\n');
    const basename = path.basename(markdownFile, '.md');

    return {
        [basename]: lines.reduce((acc, line) => {
            acc.push(parse(line));

            return acc;
        }, []),
    };
};

const buildBlocksMap = async function buildBlocksMap(...markdownFiles) {
    return Promise.all(
        markdownFiles.map(async mdFile => buildBlocks(mdFile))
    ).then(blocks =>
        blocks.reduce((acc, block) => Object.assign({}, acc, block), {})
    );
};

export default buildBlocksMap;
