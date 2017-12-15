import dictionary from './dictionary.mjs';

const transform = block => {
    const transformedHtmlString = dictionary.reduce((htmlString, entry) => {
        if (block.element === entry.name) {
            return entry.transform(block);
        }

        return null;
    }, null);

    if (block.element === 'h1') {
        return `<h1>${block.child}</h1>`;
    } else if (block.element === 'h2') {
        return `<h2>${block.child}</h2>`;
    }

    if (transformedHtmlString) {
        return transformedHtmlString;
    }

    // unknown element
    return block.child;
};

export default transform;
