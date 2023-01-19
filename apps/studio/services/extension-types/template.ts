import { Package } from "server/store";
import { generateRandomId } from "services/random";
import { TemplateConfiguration } from "./interfaces";

export function createTemplateConfig(pkg: Package): Partial<TemplateConfiguration> {
  return {
    uuid: generateRandomId(),
    type: 'template',
    package: pkg,
    displayName: pkg.displayName
  };
}
