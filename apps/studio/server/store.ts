import { join } from "path";

export interface Package {
  displayName: string;
  scope: string;
  package: string;
  thumbnail: string;
  version: string;
  cost: number;
  rating: number
  type: "template" | "component" | "widget" | "plugin";
  standalone: boolean,
  exposedModules: {
    moduleName: string;
    componentName: string;
  }[],
  schema: Record<string, unknown>
}

export function getStorePath() {
  const appPrefix = '.extension-repository-store';
  return join(process.cwd(), appPrefix)
}
