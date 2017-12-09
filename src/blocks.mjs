import fs from 'fs';
import path from 'path';
import pify from 'pify';

const read = pify(fs.readFile);

const buildBlocks = async function buildTree(markdownFile) {
    const content = await read(markdownFile, 'utf-8');
    const lines = content.split('\n');
    const basename = path.basename(markdownFile, '.md');

    return {
        [basename]: lines.reduce((acc, line) => {
            if (line.startsWith('# ')) {
                acc.push({
                    h1: line.split('# ')[1],
                });
            } else if (line.startsWith('## ')) {
                acc.push({
                    h2: line.split('## ')[1],
                });
            }

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
