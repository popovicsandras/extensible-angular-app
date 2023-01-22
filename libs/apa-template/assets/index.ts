import { readdirSync } from 'fs';
import { resolve } from 'path';
const fileBlacklist = ['.DS_Store', 'index.ts', '.gitkeep', 'ng-package.json'];

export function getAssets() {
  return readdirSync(__dirname)
    .filter(file => !fileBlacklist.includes(file))
    .map(file => resolve(__dirname, file));
}
