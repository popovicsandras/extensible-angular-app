import { readFileSync } from "fs";
import { resolve } from "path";
import { enbleCors } from "server/cors";
import { getConfigPath } from "server/store";

// This is for the Preview to get the configuration of the UI
export default function handler(req, res) {
  const { uuid } = req.query;
  const configJson = JSON.parse(readFileSync(resolve(getConfigPath(), `${uuid}.json`), 'utf8'));

  const result = Object.values(configJson.extensions || [])
    .reduce((acc: Record<string, any>, extension: any) => {
      const packageName = extension.package.scope + '/' + extension.package.package;
      return {
        ...acc,
        [packageName]: `http://localhost:4000/api/extensions/${packageName}`
      };
    }, {} as Record<string, any>);

  if (configJson.template) {
    const packageName = configJson.template.package.scope + '/' + configJson.template.package.package;
    result[packageName] = `http://localhost:4000/api/extensions/${packageName}`;
  }

  enbleCors(req, res);
  res.status(200).json(result);
}
