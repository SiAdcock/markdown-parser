import fs from 'fs';
import path from 'path';
import pify from 'pify';

const read = pify(fs.readFile);

const buildBlock = line => {
    if (line.startsWith('# ')) {
        return {
            element: 'h1',
            child: line.split('# ')[1],
        };
    } else if (line.startsWith('## ')) {
        return {
            element: 'h2',
            child: line.split('## ')[1],
        };
    }

    // invalid markdown
    return {
        element: 'unknown',
        child: line,
    };
};

const buildBlocks = async function buildTree(markdownFile) {
    const content = await read(markdownFile, 'utf-8');
    const lines = content.split('\n');
    const basename = path.basename(markdownFile, '.md');

    return {
        [basename]: lines.reduce((acc, line) => {
            acc.push(buildBlock(line));

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
