const { resolve } = require('path');
const config = require('../src/assets/config.json');
const readFileSync = require('fs-extra').readFileSync;
const writeFileSync = require('fs-extra').writeFileSync;
const ensureDirSync = require('fs-extra').ensureDirSync;

let ngModuleContent = readFileSync(resolve(process.cwd(), 'apps/app/src/app/production-build.module.ts'), 'utf8');

const staticImports = [];
const modulesImports = [];
const modulesConstructor = [];

if (config.template) {
  staticImports.push(`import { ${config.template.componentName} } from '${config.template.remoteName}';`);
  modulesImports.push(config.template.componentName);
  modulesConstructor.push(`
    this.applicationSlotService.set(
      'template',
      ${config.template.componentName},
      ${JSON.stringify(config.template.options)}
    );
  `);
}

ngModuleContent = ngModuleContent.replace('/*${IMPORTS}*/', staticImports.join('\n'));
ngModuleContent = ngModuleContent.replace('/*${MODULE_IMPORTS}*/', modulesImports.join(',\n'));
ngModuleContent = ngModuleContent.replace('/*${MODULE_CONSTRUCTOR}*/', modulesConstructor.join('\n\n'));

const tmpDir = resolve(__dirname, '../tmp');
ensureDirSync(tmpDir);
writeFileSync(resolve(tmpDir, 'production-build.module.ts'), ngModuleContent, 'utf8');
