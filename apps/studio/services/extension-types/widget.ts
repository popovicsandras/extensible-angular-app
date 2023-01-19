import { Package } from "server/store";
import { generateRandomId } from "services/random";
import { WidgetConfiguration } from "./interfaces";

export function createWidgetConfig(pkg: Package): WidgetConfiguration {
  return {
    uuid: generateRandomId(),
    type: 'widget',
    package: pkg,
    displayName: pkg.name
  };
}
