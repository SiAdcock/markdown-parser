export default [
    {
        element: 'h1',
        matcher(line) {
            return line.startsWith('# ');
        },
        parse(line) {
            return {
                element: 'h1',
                child: line.split('# ')[1],
            };
        },
        transform(block) {
            return `<h1>${block.child}</h1>`;
        },
    },
    {
        element: 'h2',
        matcher(line) {
            return line.startsWith('## ');
        },
        parse(line) {
            return {
                element: 'h2',
                child: line.split('## ')[1],
            };
        },
        transform(block) {
            return `<h1>${block.child}</h1>`;
        },
    },
];
