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
            }

            return acc;
        }, []),
    };
};

const buildBlockMap = async function buildBlockMap(...markdownFiles) {
    // eslint-disable-next-line prefer-arrow-callback
    return markdownFiles.reduce(async function constructBlockMapFromFiles(
        acc,
        file
    ) {
        const currentBlocks = await buildBlocks(file);

        return Object.assign({}, acc, currentBlocks);
    },
    {});
};

export default buildBlockMap;
