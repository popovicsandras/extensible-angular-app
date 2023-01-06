const { resolve } = require('path');
const config = require('../src/assets/config.json');
const readFileSync = require('fs-extra').readFileSync;

console.log('retek', config);

const ngModuleContent = readFileSync(resolve(__dirname, '../src/app/production-build.module.ts'), 'utf8');

const staticImports =
console.log(ngModuleContent);
