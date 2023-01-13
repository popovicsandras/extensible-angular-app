import { basename, resolve } from "path";
import { ensureDirSync, emptyDirSync } from "fs-extra";
import * as config from'../src/config/application.json';
import { copyFileSync } from "fs";

const assetPath = resolve(__dirname, '../src/assets');

class AssetAccumulator {

  async run() {
    this.ensureNecessaryDirs();
    const packages = config.components
      .map(component => component.remoteName)
      .concat([config.template.remoteName]);

    for await (const packageName of packages) {
      try {
        const { getAssets } = await import(`${packageName}/assets`);
        const assets = getAssets();

        const packageTargetDir = resolve(assetPath, packageName);

        ensureDirSync(packageTargetDir);
        // emptyDirSync(packageTargetDir);

        assets.forEach((asset) => {
          copyFileSync(
            resolve(assetPath, packageName, asset),
            resolve(packageTargetDir, basename(asset))
          )
        });
      } catch (e: any) {
        if (e?.code !== 'MODULE_NOT_FOUND') {
          throw e;
        }
      }
    }
  }

  ensureNecessaryDirs() {
    ensureDirSync(assetPath);
    emptyDirSync(assetPath);
  }
}

const assembler = new AssetAccumulator();
assembler.run();
