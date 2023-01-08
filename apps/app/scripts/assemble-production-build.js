const { resolve } = require('path');
const config = require('../src/assets/config.json');
const readFileSync = require('fs-extra').readFileSync;
const writeFileSync = require('fs-extra').writeFileSync;
const ensureDirSync = require('fs-extra').ensureDirSync;
const emptyDirSync = require('fs-extra').emptyDirSync;

const wrappedModulesContainerPath = resolve(__dirname, '../src/app/.lazy-modules');
const appPath = resolve(__dirname, '../src/app');
const ngModulecontentPath = resolve(appPath, 'production-build.module.ts');
const wrapperModuleContentPath = resolve(__dirname, 'wrapper.module.ts.tmpl');

class ProductionBuildAssembler {
  constructor() {
    this.ngModuleContent = readFileSync(ngModulecontentPath, 'utf8');
    this.wrapperModuleContentTemplate = readFileSync(wrapperModuleContentPath, 'utf8');
    this.staticImports = [];
    this.modulesImports = [];
    this.modulesConstructor = [];
    this.routes = [];
  }

  assemble() {
    this.ensureNecessaryDirs();

    this.processTemplate();
    this.processComponents();

    this.outputProductionBuildModeModule();
    this.outputRoutes();
  }

  processTemplate() {
    if (config.template) {
      this.staticImports.push(`import { ${config.template.componentName} } from '${config.template.remoteName}';`);
      this.modulesImports.push(config.template.componentName);
      this.modulesConstructor.push(`
        this.applicationSlotService.set(
          'template',
          ${config.template.componentName},
          ${JSON.stringify(config.template.options)}
        );`);
    }
  }

  processComponents() {
    if (config.components?.length) {
      // We need to wrap each component in a module to be able to lazy load it...
      // Angular quirks: can't lazy load a component/module from node_modules
      config.components.forEach((component, key) => {
        const fileName = `wrapped-lazy-${key}.module`;
        const wrappedModuleName = `WrappedModuleForLazyLoad${key}`;

        const wrappedModuleContent = this.wrapperModuleContentTemplate
          .replaceAll('/*${MODULE_NAME}*/', component.componentName)
          .replace('/*${MODULE_PATH}*/', component.remoteName)
          .replace('/*${WRAPPED_MODULE_NAME}*/ ', wrappedModuleName);

          this.routes.push(`{ path: '${component.options.route}', loadChildren: () => import('./.lazy-modules/${fileName}').then(m => m.${wrappedModuleName}) }`);

          this.modulesConstructor.push(`
            this.navigationService.addMenuItem({
              title: '${component.options.title}',
              url: '${component.options.route}'
            });`);

          writeFileSync(resolve(wrappedModulesContainerPath, `${fileName}.ts`), wrappedModuleContent, 'utf8');
      });
    }
  }

  ensureNecessaryDirs() {
    ensureDirSync(wrappedModulesContainerPath);
    emptyDirSync(wrappedModulesContainerPath);
  }

  outputProductionBuildModeModule() {
    this.ngModuleContent = this.ngModuleContent.replace('/*${IMPORTS}*/', this.staticImports.join('\n'));
    this.ngModuleContent = this.ngModuleContent.replace('/*${MODULE_IMPORTS}*/', this.modulesImports.join(',\n'));
    this.ngModuleContent = this.ngModuleContent.replace('/*${MODULE_CONSTRUCTOR}*/', this.modulesConstructor.join('\n\n'));

    writeFileSync(resolve(appPath, '.production-build.generated.module.ts'), this.ngModuleContent, 'utf8');
  }

  outputRoutes() {
    const routesContent = readFileSync(resolve(appPath, 'app.routes.ts'), 'utf8')
      .replace('/*${WRAPPED_LAZY_MODULE_ROUTES}*/', this.routes.join(',\n'));
      writeFileSync(resolve(appPath, '.app.generated.routes.ts'), routesContent, 'utf8');
  }
}

const assembler = new ProductionBuildAssembler();
assembler.assemble();
