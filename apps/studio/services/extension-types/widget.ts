import { Package } from "server/store";
import { generateRandomId } from "services/random";
import { WidgetConfiguration } from "./interfaces";

export function createWidgetConfig(pkg: Package): Partial<WidgetConfiguration> {
  return {
    uuid: generateRandomId(),
    type: 'widget',
    package: pkg,
    displayName: pkg.displayName
  };
}
