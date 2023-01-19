import { Package } from "server/store";
import { generateRandomId, generateRandomName } from "services/random";
import { ComponentConfiguration } from "./interfaces";

export function createComponentConfig(pkg: Package): ComponentConfiguration {
  return {
    uuid: generateRandomId(),
    type: 'component',
    package: pkg,
    displayName: pkg.name,
    options: {
      title: 'Untitled',
      route: generateRandomName()
    },
  };
}
