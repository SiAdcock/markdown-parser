import dictionary from './dictionary.mjs';

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

    // invalid markdown
    return {
        element: 'unknown',
        child: line,
    };
};

export default parse;
