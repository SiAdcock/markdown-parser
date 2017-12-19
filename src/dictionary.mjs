export default [
    {
        name: 'h1',
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
        name: 'h2',
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
            return `<h2>${block.child}</h2>`;
        },
    },
];
