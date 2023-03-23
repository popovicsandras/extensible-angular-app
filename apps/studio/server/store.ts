import { join } from "path";

export interface Package {
  displayName: string;
  scope: string;
  package: string;
  thumbnail: string;
  version: string;
  cost: number;
  rating: number
  type: "template" | "component";
  standalone: boolean,
  exposedModules: {
    moduleName: string;
    componentName: string;
  }[],
  schema: Record<string, unknown>
}

export function getStorePath() {
  const storeDir = '.extension-repository-store';
  return join(process.cwd(), storeDir)
}

export function getConfigPath() {
  const configDir = '.configs';
  return join(process.cwd(), configDir)
}
