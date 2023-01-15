import { join } from "path";

export interface Package {
  name: string;
  scope: string;
  thumbnail: string;
  version: string;
  cost: number;
  rating: number
  type: "template" | "component" | "widget" | "plugin";
}

export function getStorePath() {
  const appPrefix = '.extension-repository-store';
  return join(process.cwd(), appPrefix)
}
