#! node

console.log('刚才什么情况')
const fs = require('fs');
const path = require('path');


let files = [];

const dir = fs.readdirSync('./src');
console.log(dir);
function copyDir(url,arr) {
   const dir = fs.readdirSync(url) ;

    arr.push(url);
    dir.forEach(file =>{
        //console.log(path.resolve(__dirname, file));
        //console.log(fs.lstatSync(path.resolve(url, file)).isDirectory());
        if(fs.lstatSync(path.resolve(url, file)).isDirectory()){

            arr.push( copyDir(path.resolve(url, file),[]));
        }else{
            arr.push(file);
        }
    })
    return arr;
}

console.log(copyDir('./src',[]));

if(!fs.existsSync('./dist')){
    fs.mkdirSync('./dist')
}
