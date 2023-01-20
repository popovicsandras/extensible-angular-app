import { readFileSync } from "fs";
import { resolve } from "path";
import { getConfigPath } from "server/store";

export default function handler(req, res) {
  const { uuid } = req.query;
  const configJson = JSON.parse(readFileSync(resolve(getConfigPath(), `${uuid}.json`), 'utf8'));

  const result = {
    template: configJson.template,
    components: Object.values(configJson.extensions).filter((extension: any) => extension.type === 'component').map(sanitiseExtension),
    widgets: Object.values(configJson.extensions).filter((extension: any) => extension.type === 'widget').map(sanitiseExtension),
    plugins: Object.values(configJson.extensions).filter((extension: any) => extension.type === 'plugin').map(sanitiseExtension),
  }

  res.status(200).json(result);
}

function sanitiseExtension(extension: any) {
  return {
    displayName: extension.displayName,
    remoteName: extension.package.scope + '/' + extension.package.package,
    exposedModule: extension.package.exposedModules[0].moduleName,
    componentName: extension.package.exposedModules[0].componentName,
    standalone: extension.package.standalone,
    options: extension.options,
  }
}
