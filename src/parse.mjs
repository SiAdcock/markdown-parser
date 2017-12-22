import dictionary from './dictionary.mjs';

const parseChildren = function parseChildren(block) {
    if (typeof block.children === 'string') {
        return {
            element: 'text',
            children: block.children,
        };
    }

    const parsedBlock = dictionary.reduce((acc, entry) => {
        if (acc) {
            return acc;
        }

        if (entry.matcher(block.children)) {
            return entry.parse(block.children);
        }

        return null;
    }, null);
};

/*
type TextBlock = {
    element = 'text',
    children = string
}

type Block extends TextBlock = {
    element: 'h1' | 'h2' | 'h3' | 'block-quote',
    children: Array<Block>
}
 */
const parse = line => {
    const parsedBlock = dictionary.reduce((block, entry) => {
        if (block) {
            return block;
        }

        if (entry.matcher(line)) {
            return entry.parse(line);
        }

        return null;
    }, null);

    if (parsedBlock) {
        return parsedBlock;
    }

    // raw text block
    return {
        element: 'text',
        children: line,
    };
};

export default parse;
