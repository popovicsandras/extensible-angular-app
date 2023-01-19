import { join } from "path";

export interface Package {
  name: string;
  scope: string;
  package: string;
  thumbnail: string;
  version: string;
  cost: number;
  rating: number
  type: "template" | "component" | "widget" | "plugin";
  exposedModules: {
    moduleName: string;
    componentName: string;
  };
}

export function getStorePath() {
  const appPrefix = '.extension-repository-store';
  return join(process.cwd(), appPrefix)
}
