import formidable from "formidable";
import * as decompress from 'decompress';
import * as decompressTargz from 'decompress-targz';
import { tmpdir } from "os";
import { resolve } from "path";
import { moveSync, emptyDirSync } from "fs-extra";
import { readFile } from "node:fs/promises";
import { getStorePath, Package } from "server/store";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const pkgJson = await saveFile(files.file);

    const response: Package = {
      displayName: pkgJson.extension.displayName,
      scope: pkgJson.name.split('/')[0],
      package: pkgJson.name.split('/')[1],
      thumbnail: `/api/thumbnail/${pkgJson.name}`,
      version: pkgJson.version,
      cost: pkgJson.name === '@extensible-angular-app/custom-template' ? 23.9 : 0,
      rating: Math.random() * 5,
      type: pkgJson.extension.type,
      standalone: pkgJson.extension.standalone,
      exposedModules: pkgJson.extension.exposedModules,
      schema: pkgJson.extension.schema
    };

    return res.status(201).json(response);
  });
};

const saveFile = async (file) => {
  const tmpDir = resolve(tmpdir(), `${file.newFilename}-decompressed`);
  emptyDirSync(tmpDir);

  await decompress(file.filepath, tmpDir, {plugins: [ decompressTargz() ]});

  const packageDir = resolve(tmpDir, 'package');
  const packageJson = JSON.parse(await readFile(resolve(packageDir, 'package.json'), 'utf8'));
  const {name: packageName} = packageJson;
  const [scope, packageFolder] = packageName.split('/');
  const destDir = resolve(getStorePath(), scope);
  moveSync(packageDir, resolve(destDir, packageFolder), { overwrite: true });
  return packageJson;
};

export default function handler(req, res){
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};

