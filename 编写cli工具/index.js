#!/usr/bin/env node

// 10行伪代码实现一个CLI
// function CLI(packageSourcePath) {
//     const context = {}
//     const meta = require(path.join(packageSourcePath, 'meta.js'))
//     const templatePath = path.join(packageSourcePath, 'template')
//     const { prompts } = meta
//     return promptsRunner(prompts).then(anwsers => {
//         Object.assign(context, anwsers)
//         return generateFiles(templatePath, context)
//     })
//     .then(() =>  console.log('[OK]'))
//     .error(() => console.log('[Error]'))
// }

console.log('刚才什么情况');

// const download = require('download-git-repo');

// download('xywai1993/webtt', 'download-temp', {}, err => {
//     console.log(err);
// });

const { lstatSync, copyFile } = require('fs');
copyFile('template', 'temp', err => {
    console.log(err);
});

const copydir = dir => {
    if (lstatSync(dir).isDirectory()) {
    }
};
