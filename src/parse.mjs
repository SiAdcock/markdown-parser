const parse = line => {
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

export default parse;
