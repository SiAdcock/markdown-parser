import dictionary from './dictionary.mjs';

const transform = block => {
    const transformedHtmlString = dictionary.reduce((htmlString, entry) => {
        if (htmlString) {
            return htmlString;
        }

        if (block.element === entry.name) {
            return entry.transform(block);
        }

        return null;
    }, null);

    if (transformedHtmlString) {
        return transformedHtmlString;
    }

    // unknown element
    return block.child;
};

export default transform;
