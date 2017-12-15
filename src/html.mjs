import fs from 'fs';
import path from 'path';
import pify from 'pify';

const write = pify(fs.writeFile);
const mkdir = pify(fs.mkdir);
const access = pify(fs.access);

const generateHtml = async function generateHtml(blocksMap) {
    const htmlStrMap = Object.keys(blocksMap).reduce((blocksAcc, blocks) => {
        const htmlString = blocksMap[blocks]
            .reduce((htmlArray, block) => {
                if (block.element === 'h1') {
                    htmlArray.push(`<h1>${block.child}</h1>`);
                } else if (block.element === 'h2') {
                    htmlArray.push(`<h2>${block.child}</h2>`);
                }

                return htmlArray;
            }, [])
            .join('\n');

        return Object.assign({}, blocksAcc, { [blocks]: htmlString });
    }, {});

    await access('dist').catch(() => mkdir('dist'));

    Object.keys(htmlStrMap).forEach(filename => {
        const filePath = path.join('dist', `${filename}.html`);

        fs.createWriteStream(filePath);
        write(filePath, htmlStrMap[filename]);
    });
};

export default generateHtml;
