import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fakePackages } from "./fake-packages";
import { getStorePath, Package } from "./store";

export function getExtensions() {
  const storePath = getStorePath();
  const packages: Package[] = [];

  readdirSync(storePath).forEach(file => {
    const scopeDir = resolve(storePath, file);
    readdirSync(scopeDir).forEach(pkg => {
      const pkgJson = JSON.parse(readFileSync(resolve(scopeDir, pkg, 'package.json')));
      packages.push({
        name: pkgJson.extension.name,
        package: pkg,
        scope: file,
        thumbnail: `/api/thumbnail/${pkgJson.name}`,
        version: pkgJson.version,
        cost: pkgJson.name === '@extensible-angular-app/custom-template' ? 23.9 : 0,
        rating: Math.random() * 5,
        type: pkgJson.extension.type
      })
    });
  });

  return {
    props: {
      pkgs: [
        ...packages,
        ...fakePackages
      ] as Package[]
    }
  };
}
