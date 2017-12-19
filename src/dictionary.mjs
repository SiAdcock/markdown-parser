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
    {
        name: 'h3',
        matcher(line) {
            return line.startsWith('### ');
        },
        parse(line) {
            return {
                element: 'h3',
                child: line.split('### ')[1],
            };
        },
        transform(block) {
            return `<h3>${block.child}</h3>`;
        },
    },
    {
        name: 'block-quote',
        matcher(line) {
            return line.startsWith('> ');
        },
        parse(line) {
            return {
                element: 'block-quote',
                child: line.split('> ')[1],
            };
        },
        transform(block) {
            return `<div class="block-quote">${block.child}</div>`;
        },
    },

];
