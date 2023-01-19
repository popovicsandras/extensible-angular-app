import { Package } from "server/store";
import { generateRandomId } from "services/random";
import { PluginConfiguration } from "./interfaces";

export function createPluginConfig(pkg: Package): Partial<PluginConfiguration> {
  return {
    uuid: generateRandomId(),
    type: 'plugin',
    package: pkg,
    displayName: pkg.displayName
  };
}
