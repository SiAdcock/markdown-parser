const transform = block => {
    if (block.element === 'h1') {
        return `<h1>${block.child}</h1>`;
    } else if (block.element === 'h2') {
        return `<h2>${block.child}</h2>`;
    }

    // unknown element
    return block.child;
};

export default transform;
