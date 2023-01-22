import { readFileSync } from "fs";
import { resolve } from "path";
import { enbleCors } from "server/cors";
import { getConfigPath } from "server/store";

// This is for the Preview to get the configuration of the UI
export default function handler(req, res) {
  const { uuid } = req.query;
  const configJson = JSON.parse(readFileSync(resolve(getConfigPath(), `${uuid}.json`), 'utf8'));

  const result = {
    template: configJson.template ? sanitiseExtension(configJson.template) : null,
    components: Object.values(configJson.extensions ?? []).filter((extension: any) => extension.type === 'component').map(sanitiseExtension),
    widgets: Object.values(configJson.extensions ?? []).filter((extension: any) => extension.type === 'widget').map(sanitiseExtension),
    plugins: Object.values(configJson.extensions ?? []).filter((extension: any) => extension.type === 'plugin').map(sanitiseExtension),
  }

  enbleCors(req, res);
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
