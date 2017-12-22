export default [
    {
        name: 'h1',
        matcher(line) {
            return line.startsWith('# ');
        },
        parse(line) {
            return {
                element: 'h1',
                children: line.split('# ')[1],
            };
        },
        transform(block) {
            return `<h1>${block.children}</h1>`;
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
                children: line.split('## ')[1],
            };
        },
        transform(block) {
            return `<h2>${block.children}</h2>`;
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
                children: line.split('### ')[1],
            };
        },
        transform(block) {
            return `<h3>${block.children}</h3>`;
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
                children: line.split('> ')[1],
            };
        },
        transform(block) {
            return `<div class="block-quote">${block.children}</div>`;
        },
    },

];
