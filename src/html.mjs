import fs from 'fs';
import path from 'path';
import pify from 'pify';

const write = pify(fs.writeFile);
const mkdir = pify(fs.mkdir);
const access = pify(fs.access);

const generateHtml = async function generateHtml(blocksMap) {
    const htmlStrMap = Object.keys(blocksMap).reduce((blocksAcc, blocks) => {
        const htmlString = blocksMap[blocks]
            .reduce((acc, line) => {
                if (line.h1) {
                    acc.push(`<h1>${line.h1}</h1>`);
                } else if (line.h2) {
                    acc.push(`<h2>${line.h2}</h2>`);
                }

                return acc;
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
